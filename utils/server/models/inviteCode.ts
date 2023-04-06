// models/InviteCode.js
// const mongoose = require('mongoose');
import * as mongoose from 'mongoose';

const requestSchema = new mongoose.Schema({
  timestamp: { type: Number, required: true },
});

const inviteCodeSchema = new mongoose.Schema({
  code: { type: String, required: true },
  value: { type: String, required: true },
  usedAt: { type: Date, default: null },
  isUsed: { type: Boolean, default: false },
  requestCount: { type: Number, default: 0 },
  lastRequestedAt: { type: Date, default: null },
  maxRequestPerDay: { type: Number, default: 100 },
  requests: [requestSchema],
});

const InviteCode = mongoose.model('InviteCode', inviteCodeSchema, 'inviteCodes');

export default InviteCode;
