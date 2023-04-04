import { ChatBody, Message } from '@/types/chat';
import { DEFAULT_SYSTEM_PROMPT } from '@/utils/app/const';
import { OpenAIError, OpenAIStream } from '@/utils/server';
import tiktokenModel from '@dqbd/tiktoken/encoders/cl100k_base.json';
import { Tiktoken, init } from '@dqbd/tiktoken/lite/init';
// @ts-expect-error
export const config = {
  runtime: 'edge',
};

const handler = async (req: Request): Promise<Response> => {
  try {
    const { inviteCode } = await req.json();

    console.log('接到inviteCode', inviteCode);

    return new Response('ok');
  } catch (error) {
    console.log('erroractivateCode', error);
  }
};

export default handler;
