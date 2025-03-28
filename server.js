const express = require("express");
const path = require("path");
const cors = require("cors");
const connectDB = require("./database");

require("dotenv").config();

const app = express();

// Connect to MongoDB Atlas
connectDB().then(() => console.log("✅ Database connection initialized")).catch(err => console.error("❌ Database connection failed:", err));

// Middleware
app.use(express.json());
app.use(cors());

// ✅ Serve static files correctly
app.use(express.static(path.join(__dirname, "public")));

// ✅ Route to serve index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// ✅ Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
