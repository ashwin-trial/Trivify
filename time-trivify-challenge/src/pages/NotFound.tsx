import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import logo from '../assets/logo.png';
import AnimatedBackground from '../components/AnimatedBackground';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black text-white font-sans">
      <AnimatedBackground />
      
      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen px-6">
        <motion.img
          src={logo}
          alt="Trivify"
          className="h-16 w-auto mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        />

        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h1 className="text-6xl font-bold mb-4">404</h1>
          <p className="text-xl text-white/80 mb-8">Oops! Page not found.</p>
          
          <motion.button
            onClick={() => navigate('/')}
            className="px-8 py-3 rounded-xl bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600 text-white font-bold"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Back to Home
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
