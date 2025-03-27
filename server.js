const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ChatResponse = require('./ChatResponse');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Connect to MongoDB (without using an external `database.js`)
const MONGO_URI = 'mongodb://localhost:27017/portfolioDB'; // Local MongoDB

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB Connected'))
.catch(err => console.error('❌ MongoDB Connection Failed:', err));

// ✅ Middleware
app.use(cors()); // Enable CORS for frontend
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
