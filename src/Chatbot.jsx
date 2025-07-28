
  import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [fileUploaded, setFileUploaded] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/upload`, {
        method: 'POST',
        body: formData,
      });
      const data = await res.text(); // expecting a text confirmation
      setMessages(prev => [...prev, { sender: 'System', text: data }]);
      setFileUploaded(true);
    } catch (err) {
      setMessages(prev => [...prev, { sender: 'System', text: '❌ File upload failed.' }]);
    } finally {
      setUploading(false);
    }
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { sender: 'You', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();
      setMessages((prev) => [...prev, { sender: 'Bot', text: data.reply }]);
    } catch (error) {
      setMessages((prev) => [...prev, { sender: 'Bot', text: '⚠️ Error connecting to backend.' }]);
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '2rem auto', textAlign: 'left' }}>
      {!fileUploaded && (
        <div style={{ marginBottom: '1rem' }}>
          <label>📄 Upload your timetable (PDF or Excel): </label>
          <input type="file" accept=".pdf,.xlsx,.xls" onChange={handleFileUpload} disabled={uploading} />
          {uploading && <p>Uploading...</p>}
        </div>
      )}
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
              fontWeight: msg.sender === 'Bot' ? 'bold' : msg.sender === 'System' ? 'italic' : 'normal'
            }}
          >
            {msg.sender}: {msg.text}
          </motion.div>
        ))}
      </div>
      {fileUploaded && (
        <div style={{ display: 'flex', marginTop: '1rem' }}>
          <input
            style={{ flex: 1, padding: '0.5rem' }}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Ask something about your timetable..."
          />
          <button onClick={sendMessage} style={{ padding: '0.5rem' }}>
            Send
          </button>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
