// ✅ Carousel Logic
const carousel = document.querySelector('.carousel');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

let currentIndex = 0;
const totalItems = document.querySelectorAll('.project-card').length;

function updateCarousel() {
    carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
}

prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + totalItems) % totalItems;
    updateCarousel();
});

nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % totalItems;
    updateCarousel();
});

// ✅ Auto-Slide Every 5 Seconds
setInterval(() => {
    currentIndex = (currentIndex + 1) % totalItems;
    updateCarousel();
}, 5000);

// Predefined Replies
const replies = {
    "hi": "Hello! How can I help you today?",
    "projects": "I have worked on several projects including web development, AI chatbots, and more!",
    "contact": "You can reach me at pandaabzariyon@gmail.com or find me on LinkedIn.",
    "bye": "Goodbye! Have a great day!",
    "default": "I'm not sure how to respond to that. Can you try asking differently?"
};

// Toggle Chatbot Visibility
function toggleChatbot() {
    const chatbot = document.getElementById('chatbot-window');
    chatbot.style.display = chatbot.style.display === 'none' ? 'flex' : 'none';
}

// Send User Message
function sendMessage() {
    const input = document.getElementById('chat-input');
    const message = input.value.trim();

    if (message) {
        addMessage(message, 'user');
        setTimeout(() => generateReply(message.toLowerCase()), 500);
        input.value = '';
    }
}

// Generate AI Reply
function generateReply(message) {
    const reply = replies[message] || replies["default"];
    addMessage(reply, 'bot');
}

// Add Message to Chat
function addMessage(text, sender) {
    const body = document.getElementById('chatbot-body');
    const messageElement = document.createElement('div');
    messageElement.classList.add(sender === 'user' ? 'user-message' : 'bot-message');
    messageElement.innerText = text;
    body.appendChild(messageElement);
    body.scrollTop = body.scrollHeight;
}

// Auto Open Chatbot after 2 Seconds
window.addEventListener('load', () => {
    setTimeout(() => toggleChatbot(), 2000);
});

// Handle Enter Key for Sending Message
document.getElementById('chat-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});

