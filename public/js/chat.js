// chat.js

const chatContainer = document.getElementById("chat-container");
const inputField = document.getElementById("chat-input");
const sendBtn = document.getElementById("send-btn");

// Keep chat history
let chatHistory = [];

// Function to add message to chat
function addMessage(text, sender) {
  const messageEl = document.createElement("div");
  messageEl.classList.add("message", sender);
  messageEl.textContent = text;
  chatContainer.appendChild(messageEl);
  chatContainer.scrollTop = chatContainer.scrollHeight;

  // Add to sidebar history
  if (sender === "user") chatHistory.push({ user: text });
}

// Typing animation
async function typeMessage(message) {
  const aiEl = document.createElement("div");
  aiEl.classList.add("message", "ai");
  chatContainer.appendChild(aiEl);

  let index = 0;
  function type() {
    if (index < message.length) {
      aiEl.textContent += message.charAt(index);
      index++;
      setTimeout(type, 30); // adjust typing speed
    } else {
      // add AI reply to chat history
      chatHistory[chatHistory.length - 1].ai = message;
    }
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }
  type();
}

// Send message to Render backend
async function sendMessage() {
  const text = inputField.value.trim();
  if (!text) return;

  addMessage(text, "user");
  inputField.value = "";

  // Show typing indicator
  const typingEl = document.createElement("div");
  typingEl.classList.add("message", "ai");
  typingEl.textContent = "BEA is thinking...";
  chatContainer.appendChild(typingEl);
  chatContainer.scrollTop = chatContainer.scrollHeight;

  try {
    const response = await fetch("https://bea-ai.onrender.com/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text }),
    });

    const data = await response.json();
    typingEl.remove();
    await typeMessage(data.reply);
  } catch (error) {
    typingEl.textContent = "Error: Could not reach BEA.";
    console.error(error);
  }
}

// Event listeners
sendBtn.addEventListener("click", sendMessage);
inputField.addEventListener("keydown", (e) => {
  if (e.key === "Enter") sendMessage();
});
