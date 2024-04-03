import React, { useState } from 'react';
import './ChatBot.css';

const ChatBot = () => {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState([]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleEnter = () => {
    if (inputValue.trim() !== '') {
      setMessages([...messages, inputValue]);
      setInputValue('');
    }
  };

  return (
    <div className="chatbot-container">
      <div className="messages-container">
        {messages.map((message, index) => (
          <div key={index} className="message">{message}</div>
        ))}
      </div>
      <div className="input-container">
        <textarea
          value={inputValue}
          onChange={handleInputChange}
          className="input-text"
          placeholder="Type your message here..."
          rows={3}
        />
        <button onClick={handleEnter} className="enter-button">Enter</button>
      </div>
    </div>
  );
};

export default ChatBot;
