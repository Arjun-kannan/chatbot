import React, { useState } from 'react';
import './App.css';

function App() {
  const [message, setMessage] = useState('');
  const [chatLog, setChatLog] = useState([]);

  const sendMessage = async () => {
    if (message.trim() === '') return;

    const userMessage = { type: 'user', text: message };
    setChatLog([...chatLog, userMessage]);
    setMessage('');

    try {
      const response = await fetch('http://localhost:5000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();
      const botReply = { type: 'bot', text: data.response };
      setChatLog((prevLog) => [...prevLog, botReply]);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="App">
      <h1>🤖 Chatbot</h1>
      <div className="chat-window">
        {chatLog.map((msg, i) => (
          <div key={i} className={`chat-msg ${msg.type}`}>
            <span>{msg.text}</span>
          </div>
        ))}
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
