import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([...messages, { sender: 'You', text: input }]);
    setMessages((prev) => [...prev, { sender: 'Bot', text: 'This is a static reply for now.' }]);
    setInput('');
  };

  return (
    <div style={{ maxWidth: '400px', margin: '2rem auto', textAlign: 'left' }}>
      <div style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '8px', height: '300px', overflowY: 'auto' }}>
        {messages.map((msg, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            style={{
              marginBottom: '1rem',
              textAlign: msg.sender === 'You' ? 'right' : 'left',
              fontWeight: msg.sender === 'Bot' ? 'bold' : 'normal'
            }}
          >
            {msg.sender}: {msg.text}
          </motion.div>
        ))}
      </div>
      <div style={{ display: 'flex', marginTop: '1rem' }}>
        <input
          style={{ flex: 1, padding: '0.5rem' }}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Ask something..."
        />
        <button onClick={sendMessage} style={{ padding: '0.5rem' }}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
