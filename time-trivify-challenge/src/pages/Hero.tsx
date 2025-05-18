import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import logo from '../assets/logo.png';
import AnimatedBackground from '../components/AnimatedBackground';

const Hero = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/select');
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black text-white font-sans">
      <AnimatedBackground />

      {/* Main Content */}
      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen px-6 text-center">
        {/* Logo Animation */}
        <motion.img
          src={logo}
          alt="Trivify Logo"
          className="w-[300px] md:w-[600px] h-auto mb-8 mt-[-15rem]"
          initial={{ opacity: 0, y: 600, scale: 0.4 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />

        {/* Start Button Animation */}
       <motion.button
  onClick={handleStart}
  className="relative px-8 py-3 mt-[-18rem] rounded-xl
             text-white text-lg
             bg-transparent
             outline-none focus:ring-2 focus:ring-pink-400/20
             drop-shadow-[0_0_15px_rgba(236,72,153,0.5)]
             font-comic
             overflow-hidden
             transition-all duration-500 ease-out
             hover:drop-shadow-[0_0_20px_rgba(236,72,153,0.7)]"
  style={{
    textShadow: '0 1px 2px #000',
    letterSpacing: '0.02em',
  }}
  initial={{ opacity: 0, y: 400, scale: 0.4 }}
  animate={{ opacity: 1, y: 0, scale: 1 }}
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
  transition={{
    delay: 0.01,
    duration: 0.8,
    ease: [0.4, 0, 0.2, 1],
  }}
>
  {/* Outer vibrant gradient border */}
  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600 p-[2px] pointer-events-none">
    {/* Inner subtle gradient glass panel */}
    <div
      className="w-full h-full rounded-lg backdrop-blur-md pointer-events-none"
      style={{
        background:
          'linear-gradient(135deg, rgba(253,224,71,0.1) 0%, rgba(236,72,153,0.1) 50%, rgba(139,92,246,0.1) 100%)',
      }}
    />
  </div>

  <span className="relative z-10">Start Challenge</span>
</motion.button>

        {/* Tagline Animation */}
        <motion.p
          className="mt-10 text-lg md:text-xl text-white/80 max-w-xl"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.8, ease: 'easeOut' }}
        >
          "Level up your mind."
        </motion.p>
      </div>
    </div>
  );
};

export default Hero;
