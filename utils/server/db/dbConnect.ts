// utils/server/db/dbConnect.js
// import mongoose from 'mongoose';
import { connect } from 'mongoose';

const connection = {};

async function dbConnect() {
  if (connection.isConnected) {
    return;
  }
  console.log("Connecting to MongoDB...");
  console.log("MongoDB URI:", process.env.MONGODB_URI);
  
  const db = await connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  connection.isConnected = db.connections[0].readyState;
}

export default dbConnect;
