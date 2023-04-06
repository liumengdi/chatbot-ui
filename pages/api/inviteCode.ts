// pages/api/inviteCode.js
import dbConnect from '../../utils/server/db/dbConnect';
import InviteCode from '../../utils/server/models/InviteCode';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { inviteCode } = req.body;
    if (!inviteCode) {
      return res.status(401).json({ message: 'invite code required' });
    }
    // Connect to the database
    await dbConnect();

    const code = await InviteCode.findOne({ code: inviteCode });

    console.log('code From database', code);
    if (!code) {
      return res.status(401).json({ message: '无效的邀请码' });
    }
    // TODO: 需要恢复
    // if (code.isUsed) {
    //   return res.status(401).json({ message: '邀请码已被使用' });
    // }

    // if (code.isValidate === false) {
    //   return res.status(401).json({ message: '此邀请码已被销毁' });
    // }

    const currentDate = new Date();
    await InviteCode.updateOne({ code: inviteCode }, { isUsed: true, usedAt: currentDate });
    res.status(200).json({ message: 'success' });

  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
