import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import logo from '../assets/logo.png';
import DifficultySelector from '@/components/DifficultySelector';
import { useTriviaContext } from '@/context/TriviaContext';
import { Difficulty } from '@/types/triviaTypes';
import AnimatedBackground from '@/components/AnimatedBackground';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const { startGame } = useTriviaContext();
  const navigate = useNavigate();

  const handleDifficultySelect = (difficulty: Difficulty) => {
    startGame(difficulty);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.3
      }
    }
  };

  const logoVariants = {
    hidden: { y: -50, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: 'spring', 
        stiffness: 100,
        delay: 0.2
      }
    }
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: 'spring', 
        stiffness: 100,
        delay: 0.6
      }
    }
  };

  const footerVariants = {
    hidden: { opacity: 0, scaleX: 0 },
    visible: { 
      opacity: 1, 
      scaleX: 1,
      transition: { 
        type: 'spring', 
        stiffness: 100,
        delay: 1.5
      }
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black text-white font-sans">
      <AnimatedBackground />
      <div className="relative z-20 min-h-screen flex flex-col items-center justify-center p-4">
        <motion.div 
          className="max-w-4xl w-full flex flex-col items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={logoVariants} className="mb-12">
            <motion.img
              src={logo}
              alt="Trivify Logo"
              className="w-64 md:w-80 mt-[-8rem] h-auto cursor-pointer hover:opacity-80 transition-opacity"
              initial={{ opacity: 0, y: 600, scale: 0.4 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              onClick={() => navigate('/')}
            />
          </motion.div>
          
          <motion.div variants={textVariants} className="w-full mb-12">
            <h2 className="text-2xl sm:text-3xl text-center font-bold mb-8 mt-[-9rem] text-white">
              Test your knowledge with timed trivia challenges!
            </h2>
            <p className="text-center text-white/80 mb-4">
              Select a difficulty level to start. Each game consists of 10 questions.
              As you progress, questions get harder and time limits get shorter!
            </p>
          </motion.div>
          
          <div className="w-full">
            <DifficultySelector onSelect={handleDifficultySelect} />
          </div>
          
          <motion.div 
            variants={footerVariants}
            className="mt-16 text-center text-white/70 text-sm"
          >
            <p>© 2025 Trivify - The Ultimate Trivia Challenge</p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Index;
