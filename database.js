const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      tls: true,  // Force using TLS encryption
      tlsAllowInvalidCertificates: false, // Ensure valid SSL
      serverSelectionTimeoutMS: 5000, 
    });

    console.log("✅ MongoDB Connected:", mongoose.connection.host);
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
