import React, { useState } from "react";
import "../assets/chatbot.css";

export default function Chatbot() {
  const [messages, setMessages] = useState([
    { type: "bot", text: "Hey there! I’m BookarooBot 🤖. What book genre are you into today?" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { type: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    setTimeout(() => {
      const botReply = {
        type: "bot",
        text: `Sounds awesome! Let me find some ${input.toLowerCase()} books for you 📚✨`,
      };
      setMessages((prev) => [...prev, botReply]);
    }, 800);
  };

  return (
    <> 
    <div className="chatbot-container">
      <h2 className="chatbot-title">Bookaroo Chatbot Assistant</h2>
      <div className="chat-window">
        {messages.map((msg, idx) => (
          <div key={idx} className={`message ${msg.type}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <form className="chat-input-area" onSubmit={handleSend}>
        <input
          type="text"
          placeholder="Ask me for book suggestions..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
    </>
  );
}
