const express = require("express");
const cors = require("cors");
const connectDB = require("./database");

require("dotenv").config();

const app = express();

// Connect to MongoDB Atlas
connectDB().then(() => console.log("✅ Database connection initialized"));

// Middleware
app.use(express.json());
app.use(cors());

// 📌 Serve static files from the "public" folder
app.use(express.static("public"));

// Test Route
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

// Server listening
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
