const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    question: { type: String, required: true },
    answer: { type: String, required: true }
});

const ChatResponse = mongoose.model('ChatResponse', chatSchema);

module.exports = ChatResponse;
