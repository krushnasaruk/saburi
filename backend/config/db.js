/**
 * Virtual Gurukul - Mongoose Database Connection Adapter
 */

const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/virtual_gurukul");
    console.log(`🕉️ MongoDB Connected successfully on host: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ Mongoose Connection Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
