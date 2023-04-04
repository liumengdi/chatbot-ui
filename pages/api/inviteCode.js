// pages/api/inviteCode.js
import dbConnect from '../../utils/server/db/dbConnect';
import InviteCode from '../../utils/server/models/InviteCode';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { inviteCode } = req.body;
    if (!inviteCode) {
      return res.status(400).json({ message: 'invite code required' });
    }
    // Connect to the database
    await dbConnect();

    const code = await InviteCode.findOne({ code: inviteCode });

    console.log('code From database', code);
    if (!code) {
      return res.status(400).json({ message: '无效的验证码' });
    }
    if (code.isUsed) {
      return res.status(400).json({ message: '验证码已被使用' });
    }

    const currentDate = new Date();
    await InviteCode.updateOne({ code: inviteCode }, { isUsed: true, usedAt: currentDate });
    res.status(200).json({ message: 'success' });

  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
