import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import logo from '../assets/logo.png';
import AnimatedBackground from '../components/AnimatedBackground';
import { useTriviaContext } from '../context/TriviaContext';
import ResultsChart from '../components/ResultsChart';

const ResultsPage = () => {
  const navigate = useNavigate();
  const { gameResult, resetGame } = useTriviaContext();
  
  useEffect(() => {
    // Only redirect if there's no game result in context
    if (!gameResult) {
      navigate('/');
    }
  }, [gameResult, navigate]);

  const handleBackToHome = () => {
    resetGame();
  };
  
  if (!gameResult) {
    return <div>Loading...</div>;
  }
  
  const { totalQuestions, correctAnswers, accuracy, averageTimePerQuestion, answers } = gameResult;
  
  // Determine motivational quote
  let motivationalQuote: string;
  const performancePercentage = (correctAnswers / totalQuestions) * 100;
  
  if (performancePercentage >= 90) {
    motivationalQuote = "Brilliance is not just about knowledge, but applying it at the right time. You've mastered both!";
  } else if (performancePercentage >= 70) {
    motivationalQuote = "Knowledge builds on itself. Each question you got right is a stepping stone to mastery!";
  } else if (performancePercentage >= 50) {
    motivationalQuote = "The difference between success and failure is persistence. Keep challenging yourself!";
  } else if (performancePercentage >= 30) {
    motivationalQuote = "Every expert was once a beginner. Your journey has just begun!";
  } else {
    motivationalQuote = "It's not about how many times you fall, but how many times you get back up. Try again!";
  }
  
  // Animation variants
  const pageVariants = {
    initial: {
      opacity: 0,
      scale: 0.95,
      filter: 'blur(10px)'
    },
    animate: {
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      filter: 'blur(10px)',
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const logoVariants = {
    hidden: { 
      y: -400, 
      opacity: 0,
      scale: 0.6
    },
    visible: { 
      y: 0, 
      opacity: 1,
      scale: 1,
      transition: { 
        type: 'spring',
        stiffness: 100,
        damping: 15,
        delay: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0,
      y: 30,
      scale: 0.95,
      filter: 'blur(10px)'
    },
    visible: { 
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
        delay: 0.4,
        duration: 0.6
      }
    },
    exit: {
      opacity: 0,
      y: -30,
      scale: 0.95,
      filter: 'blur(10px)',
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const statsVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.6 + (i * 0.1),
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }
    })
  };

  const quoteVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        delay: 0.8,
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const buttonVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.9,
      y: 20
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: {
        delay: 1,
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black text-white font-sans">
      <AnimatedBackground />
      <motion.div 
        className="relative z-20 min-h-screen flex flex-col items-center justify-center py-4 px-4"
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <motion.img
          src={logo}
          alt="Trivify"
          className="h-54  max-h-56 mt-[-6rem] w-auto mb-4 cursor-pointer hover:opacity-80 transition-opacity"
          variants={logoVariants}
          initial="hidden"
          animate="visible"
          onClick={() => navigate('/')}
        />
        
        <motion.div 
          className="w-full mt-[-6rem] max-w-3xl mx-auto p-4 rounded-2xl bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-xl border border-white/10 shadow-2xl"
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          style={{
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), 0 2px 8px rgba(255, 255, 255, 0.1)'
          }}
        >
          <motion.div 
            className="text-center mb-4"
            variants={statsVariants}
            custom={0}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-2  font-sora bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
              Game Results
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-trivify-green via-trivify-yellow to-trivify-red mx-auto rounded-full"></div>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-3 gap-3 mb-4"
            variants={statsVariants}
            custom={1}
          >
            <div className="bg-gradient-to-br from-trivify-green/20 to-trivify-green/10 p-3 rounded-xl text-center backdrop-blur-sm border border-trivify-green/30">
              <h3 className="text-xs font-semibold mb-1 font-sora">Score</h3>
              <p className="text-xl font-bold font-sora">{correctAnswers}/{totalQuestions}</p>
            </div>
            
            <div className="bg-gradient-to-br from-trivify-yellow/20 to-trivify-yellow/10 p-3 rounded-xl text-center backdrop-blur-sm border border-trivify-yellow/30">
              <h3 className="text-xs font-semibold mb-1 font-sora">Accuracy</h3>
              <p className="text-xl font-bold font-sora">{accuracy.toFixed(1)}%</p>
            </div>

            <div className="bg-gradient-to-br from-trivify-red/20 to-trivify-red/10 p-3 rounded-xl text-center backdrop-blur-sm border border-trivify-red/30">
              <h3 className="text-xs font-semibold mb-1 font-sora">Avg Time</h3>
              <p className="text-xl font-bold font-sora">{averageTimePerQuestion.toFixed(1)}s</p>
            </div>
          </motion.div>
          
          <motion.div 
            className="mb-4"
            variants={statsVariants}
            custom={2}
          >
            <ResultsChart answers={answers} />
          </motion.div>
          
          <motion.p 
            className="text-center text-white/80 italic mb-4 px-4 font-sora text-sm"
            variants={quoteVariants}
            initial="hidden"
            animate="visible"
          >
            "{motivationalQuote}"
          </motion.p>
          
          <motion.div 
            className="flex justify-center"
            variants={buttonVariants}
            initial="hidden"
            animate="visible"
          >
           <motion.button
  onClick={handleBackToHome}
  className="relative group px-10 py-3 rounded-full font-sora font-semibold text-lg text-white
             bg-gradient-to-r from-white/5 via-white/10 to-white/5
             border border-white/30 backdrop-blur-md
             hover:border-white/70 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]
             transition-all duration-300 overflow-hidden"
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
  <span className="relative z-10">Play Again</span>
  <div className="absolute inset-0 rounded-full border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm" />
</motion.button>

          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ResultsPage;
