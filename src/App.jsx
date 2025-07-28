import React from 'react';
import { motion } from 'framer-motion';
import Chatbot from './Chatbot';

const App = () => {
  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <motion.h1 initial={{ y: -20 }} animate={{ y: 0 }} transition={{ duration: 0.5 }}>
        🤖 Campus AI Chatbot
      </motion.h1>
      <Chatbot />
    </div>
  );
};

export default App;
