import React, { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [message, setMessage] = useState('');
  const [chatLog, setChatLog] = useState([]);
  const chatEndRef = useRef(null);

  const sendMessage = async () => {
    if (message.trim() === '') return;

    const userMessage = { type: 'user', text: message };
    setChatLog(prev => [...prev, userMessage]);
    setMessage('');

    try {
      const response = await fetch('http://localhost:5000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();
      const botReply = { type: 'bot', text: data.response };
      setChatLog(prev => [...prev, botReply]);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatLog]);

  return (
    <div className="chat-container">
      <h2 className="title">🤖 My Chatbot</h2>
      <div className="chat-box">
        {chatLog.map((msg, index) => (
          <div key={index} className={`chat-bubble ${msg.type}`}>
            <p>{msg.text}</p>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>
      <div className="input-area">
        <input
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default App;
