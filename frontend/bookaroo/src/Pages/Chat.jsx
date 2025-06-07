import React, { useState } from "react"
import "../assets/chatbot.css";

export default function Chatbot() {
  const [isThinking, setIsThinking] = useState(false);
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
  setIsThinking(true); // start thinking...

  try {
    const res = await fetch("http://localhost:5000/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input }),
    });

    const data = await res.json();
    const botReply = { type: "bot", text: data.reply };

    setMessages((prev) => [...prev, botReply]);
  } catch (err) {
    setMessages((prev) => [
      ...prev,
      { type: "bot", text: "Uh oh, I couldn't reach the server!" },
    ]);
  }

  setIsThinking(false); // done thinking
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
        {isThinking && (
  <div className="message bot thinking">
    Bookaroo is thinking
    <span className="dot">.</span>
    <span className="dot">.</span>
    <span className="dot">.</span>
  </div>
)}
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
