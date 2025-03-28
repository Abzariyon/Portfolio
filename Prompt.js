const mongoose = require('mongoose');
const ChatResponse = require('./models/ChatResponse');

mongoose.connect('mongodb://127.0.0.1:27017/chatbotDB', {
    serverSelectionTimeoutMS: 30000, // Increased timeout to 30 seconds
}).then(() => console.log('✅ MongoDB Connected for seeding...'))
  .catch(err => console.log('❌ Connection Error:', err));

const seedData = async () => {
    try {
        console.log('🔄 Seeding chatbot responses...');

        await ChatResponse.deleteMany(); // ✅ Clear existing data
        await ChatResponse.insertMany([
            { question: 'hi', answer: 'Hello! How can I help you today?' },
            { question: 'Can I have your number', answer: 'Check out my portfolio in the contact section!' },
            { question: 'good day', answer: 'Lend me a cup of coffee' },
            { question: 'panda', answer: 'Goodbye! u crazy fellow!' },
            { question: 'hello', answer: 'Hey there! What would you like to know?' },
            { question: 'projects', answer: 'Check out my portfolio in the projects section!' },
            { question: 'contact', answer: 'You can reach me through email or LinkedIn.' },
            { question: 'bye', answer: 'Goodbye! Have a great day!' },
            { question: 'help', answer: 'Sure! What would you like to know?' }
        ]);

        console.log('✅ Sample chatbot responses inserted!');
    } catch (err) {
        console.error('❌ Error seeding data:', err);
    } finally {
        mongoose.connection.close();
    }
};

seedData();

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 30000,
}).then(() => console.log('✅ MongoDB Connected for seeding...'))
  .catch(err => console.log('❌ Connection Error:', err));

