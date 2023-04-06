import { ChatBody, Message } from '@/types/chat';
import { DEFAULT_SYSTEM_PROMPT } from '@/utils/app/const';
import { OpenAIError, OpenAIStream } from '@/utils/server';
import tiktokenModel from '@dqbd/tiktoken/encoders/cl100k_base.json';
import { Tiktoken, init } from '@dqbd/tiktoken/lite/init';
import dbConnect from '../../utils/server/db/dbConnect';
import InviteCode from '../../utils/server/models/InviteCode';

// @ts-expect-error
import wasm from '../../node_modules/@dqbd/tiktoken/lite/tiktoken_bg.wasm?module';


export const config = {
  runtime: 'edge',
};


const checkInviteCode = async (code) => {
  await dbConnect();

  const inviteCode = await InviteCode.findOne({ code });

  // Check if the invite code exists
  if (!inviteCode) {
    return { valid: false, reason: 'Code does not exist' };
  }

  // Check if the invite code has expired
  if (inviteCode.expiresAt !== null && inviteCode.expiresAt < Date.now()) {
    return { valid: false, reason: 'Code has expired' };
  }

  // Update the request log and request count
  const now = Date.now();
  const oneMinuteAgo = now - 60 * 1000;
  const oneDayAgo = now - 24 * 60 * 60 * 1000;
  inviteCode.requests.push({ timestamp: now });
  inviteCode.requestCount++;
  inviteCode.lastRequestedAt = now;
  await inviteCode.save();

  // Check the request frequency
  const minuteCount = inviteCode.requests.filter(r => r.timestamp >= oneMinuteAgo).length;
  const dayCount = inviteCode.requests.filter(r => r.timestamp >= oneDayAgo).length;
  if (minuteCount > 10 || dayCount > inviteCode.maxRequestPerDay) {
    return { valid: false, reason: 'Too many requests' };
  }

  // The invite code is valid
  return { valid: true };
};




const handler = async (req: Request): Promise<Response> => {
  try {
    const { model, messages, key, prompt, inviteCode} = (await req.json()) as ChatBody;
    await init((imports) => WebAssembly.instantiate(wasm, imports));

    const checkCodeResult = await checkInviteCode(inviteCode);
    if (!checkCodeResult.valid) {
      return new Response('Error', { status: 401, statusText: checkCodeResult.reason });
    }

    console.log('验证通过')

    const encoding = new Tiktoken(
      tiktokenModel.bpe_ranks,
      tiktokenModel.special_tokens,
      tiktokenModel.pat_str,
    );

    let promptToSend = prompt;
    if (!promptToSend) {
      promptToSend = DEFAULT_SYSTEM_PROMPT;
    }

    const prompt_tokens = encoding.encode(promptToSend);

    let tokenCount = prompt_tokens.length;
    let messagesToSend: Message[] = [];

    for (let i = messages.length - 1; i >= 0; i--) {
      const message = messages[i];
      const tokens = encoding.encode(message.content);

      if (tokenCount + tokens.length + 2000 > model.tokenLimit) {
        break;
      }
      tokenCount += tokens.length;
      messagesToSend = [message, ...messagesToSend];
    }

    encoding.free();

    const stream = await OpenAIStream(model, promptToSend, key, messagesToSend);

    return new Response(stream);
  } catch (error) {
    console.error(error);
    if (error instanceof OpenAIError) {
      return new Response('Error', { status: 500, statusText: error.message });
    } else {
      return new Response('Error', { status: 500 });
    }
  }
};

export default handler;
