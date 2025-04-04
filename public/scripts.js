// ✅ Toggle Menu for Mobile
function toggleMenu() {
    document.querySelector(".nav-links").classList.toggle("active");
}

// ✅ Smooth Scrolling
document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", function (event) {
        event.preventDefault();
        const targetId = this.getAttribute("href").substring(1);
        const targetSection = document.getElementById(targetId);
        const navbarHeight = document.querySelector(".navbar").offsetHeight;

        window.scrollTo({
            top: targetSection.offsetTop - navbarHeight - 10,
            behavior: "smooth"
        });

        document.querySelector(".nav-links").classList.remove("active");
    });
});

// ✅ Resume Download Confirmation
function confirmDownload(event) {
    event.preventDefault();
    if (confirm("Are you sure you want to download the resume?")) {
        window.location.href = event.target.href;
    }
}

// ✅ Skills Description
const skillDescriptions = {
    "Java": "Used in backend development for building scalable applications.",
    "JavaScript": "Used for creating dynamic and interactive web applications.",
    "TypeScript": "Enhances JavaScript with static typing for better code management.",
    "Python": "Used in automation, AI, data science, and backend development.",
    "ReactJS": "Front-end library for building dynamic user interfaces.",
    "Next.js": "Framework for React that supports server-side rendering.",
    "Node.js": "Used for building fast and scalable backend services.",
    "Express.js": "Lightweight framework for building APIs in Node.js.",
    "MongoDB": "NoSQL database used for flexible data storage.",
    "SQL": "Used for managing structured data in relational databases.",
    "Selenium": "Automates web testing across different browsers.",
    "REST APIs": "Used for communication between frontend and backend services.",
    "Git": "Version control system for tracking code changes."
};

document.querySelectorAll('.skill-btn').forEach(button => {
    button.addEventListener('click', () => {
        const skill = button.getAttribute('data-skill');
        document.getElementById('skill-description').textContent = skillDescriptions[skill] || "No description available.";
    });
});

// ✅ Carousel Logic
const carousel = document.querySelector('.carousel');
const projectCards = document.querySelectorAll('.project-card');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

let currentIndex = 0;
const totalItems = projectCards.length;
let autoScroll;

function updateCarousel() {
    carousel.style.transition = "transform 0.5s ease-in-out";
    carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
}

function startAutoScroll() {
    autoScroll = setInterval(() => {
        currentIndex = (currentIndex + 1) % totalItems;
        updateCarousel();
    }, 5000);
}

function stopAutoScroll() {
    clearInterval(autoScroll);
}

prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + totalItems) % totalItems;
    updateCarousel();
    stopAutoScroll();
    startAutoScroll();
});

nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % totalItems;
    updateCarousel();
    stopAutoScroll();
    startAutoScroll();
});

projectCards.forEach(card => {
    card.addEventListener('mouseenter', stopAutoScroll);
    card.addEventListener('mouseleave', startAutoScroll);
});

startAutoScroll();

// ✅ Chatbot Replies
const replies = {
    "hi": "Hello! How can I help you today?",
    "projects": "I have worked on several projects including web development, AI chatbots, and more!",
    "contact": "You can reach me at pandaabzariyon@gmail.com or find me on LinkedIn.",
    "bye": "Goodbye! Have a great day!",
    "default": "I'm not sure how to respond to that. Can you try asking differently?"
};

// ✅ Toggle Chatbot
function toggleChatbot() {
    const chatbot = document.getElementById('chatbot-window');
    chatbot.style.display = chatbot.style.display === 'none' ? 'flex' : 'none';
}

// ✅ Send Message
function sendMessage() {
    const input = document.getElementById('chat-input');
    const message = input.value.trim();
    if (message) {
        addMessage(message, 'user');
        setTimeout(() => generateReply(message.toLowerCase()), 500);
        input.value = '';
    }
}

// ✅ Generate Reply
function generateReply(message) {
    const reply = replies[message] || replies["default"];
    addMessage(reply, 'bot');
}

// ✅ Add Message to Chat
function addMessage(text, sender) {
    const body = document.getElementById('chatbot-body');
    const messageElement = document.createElement('div');
    messageElement.classList.add(sender === 'user' ? 'user-message' : 'bot-message');
    messageElement.innerText = text;
    body.appendChild(messageElement);
    body.scrollTop = body.scrollHeight;
}

// ✅ Auto Open Chatbot
window.addEventListener('load', () => {
    setTimeout(() => toggleChatbot(), 2000);
});

// ✅ Send on Enter
document.getElementById('chat-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});
