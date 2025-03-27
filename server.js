require('dotenv').config();  // Load environment variables
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const fs = require('fs');  // ✅ Fix missing module

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI; // Ensure this is from .env

// ✅ Connect to MongoDB Atlas
mongoose.connect(MONGO_URI)
    .then(() => console.log("✅ MongoDB Atlas Connected"))
    .catch(err => {
        console.error("❌ MongoDB Connection Error:", err);
        process.exit(1);  // Exit if MongoDB fails to connect
    });

// ✅ Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ✅ Serve HTML File
app.get('/', (req, res) => {
    const filePath = path.join(__dirname, 'public', 'index.html');
    
    if (fs.existsSync(filePath)) {
        res.sendFile(filePath);
    } else {
        res.status(404).send("⚠️ index.html not found. Make sure it's inside the 'public' folder.");
    }
});

// ✅ Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on PORT ${PORT}`);
});
