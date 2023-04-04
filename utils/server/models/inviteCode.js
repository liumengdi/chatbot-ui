// models/InviteCode.js
import mongoose from 'mongoose';

const inviteCodeSchema = new mongoose.Schema({
  code: { type: String, required: true },
  value: { type: String, required: true },
  usedAt: { type: Date, default: null },
  isUsed: { type: Boolean, default: false },
});

const InviteCode = mongoose.model('InviteCode', inviteCodeSchema, 'inviteCodes');

export default InviteCode;
