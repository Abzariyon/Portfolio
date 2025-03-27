require('dotenv').config(); // Load environment variables

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ChatResponse = require('./ChatResponse');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI; // Ensure only MongoDB Atlas is used

if (!MONGO_URI) {
    console.error('❌ MONGO_URI is missing. Set it in the .env file.');
    process.exit(1); // Exit if MongoDB URI is not found
}

// ✅ Connect to MongoDB Atlas
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('✅ MongoDB Atlas Connected'))
    .catch(err => {
        console.error('❌ MongoDB Atlas Connection Failed:', err);
        process.exit(1); // Exit if connection fails
    });

// ✅ Middleware
app.use(cors());
app.use(express.static(__dirname));
app.use(express.json());

// ✅ Serve HTML File
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// ✅ API Endpoint to Get or Store Chat Response
app.post('/chat', async (req, res) => {
    const { message } = req.body;

    try {
        let response = await ChatResponse.findOne({ question: message.toLowerCase() });

        if (response) {
            return res.json({ reply: response.answer });
        } else {
            const defaultReply = "I'm not sure how to respond to that. I'll try to learn it!";
            const newResponse = new ChatResponse({ question: message.toLowerCase(), answer: defaultReply });

            await newResponse.save();

            console.log(`✅ Stored new response: ${message} -> ${defaultReply}`);

            return res.json({ reply: defaultReply });
        }
    } catch (error) {
        console.error('❌ Error:', error);
        return res.status(500).json({ reply: 'Server error, please try again later.' });
    }
});

// ✅ Start Server
app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
});
