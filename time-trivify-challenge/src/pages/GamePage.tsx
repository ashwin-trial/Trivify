import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/logo.png';
import AnimatedBackground from '../components/AnimatedBackground';
import { useTriviaContext } from '../context/TriviaContext';
import QuestionCard from '../components/QuestionCard';
import ProgressIndicator from '../components/ProgressIndicator';

const GamePage = () => {
  const navigate = useNavigate();
  const { 
    currentQuestion, 
    questions, 
    answerQuestion,
    nextQuestion,
    getCurrentQuestion,
    getTimeLimit,
    isLastQuestion,
    endGame
  } = useTriviaContext();

  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const [feedbackAudio] = useState(() => ({
    correct: new Audio('https://assets.mixkit.co/sfx/preview/mixkit-winning-chimes-2015.mp3'),
    wrong: new Audio('https://assets.mixkit.co/sfx/preview/mixkit-wrong-answer-fail-notification-946.mp3')
  }));

  const currentQuestionData = getCurrentQuestion();

  useEffect(() => {
    // Redirect if no questions loaded
    if (questions.length === 0) {
      navigate('/');
    }
    
    // Clean up any existing timeout when component unmounts or question changes
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [questions, navigate, timeoutId]);

  const handleAnswer = (answer: string | null, timeSpent: number) => {
    if (!currentQuestionData) return;
    
    const correct = answer === currentQuestionData.correctAnswer;
    setIsCorrect(correct);
    setShowFeedback(true);
    
    // Play sound effect
    if (correct) {
      feedbackAudio.correct.currentTime = 0;
      feedbackAudio.correct.play();
    } else {
      feedbackAudio.wrong.currentTime = 0;
      feedbackAudio.wrong.play();
    }

    answerQuestion(answer, timeSpent);

    // Set timeout for next question
    const id = setTimeout(() => {
      setShowFeedback(false);
      if (isLastQuestion()) {
        // Add a small delay before ending the game to ensure the last answer is recorded
        setTimeout(() => {
          endGame();
        }, 100);
      } else {
        nextQuestion();
      }
    }, 2000);
    
    setTimeoutId(id);
  };

  const handleTimeUp = () => {
    if (currentQuestionData) {
      handleAnswer(null, currentQuestionData.timeLimit);
    }
  };

  const handleTimeUpdate = (timeLeft: number) => {
    // Time update is handled in the QuestionCard component
  };

  if (questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xl font-sora"
        >
          Loading...
        </motion.div>
      </div>
    );
  }
  
  if (!currentQuestionData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xl font-sora"
        >
          Question not found
        </motion.div>
      </div>
    );
  }

  // Page transition variants
  const pageVariants = {
    initial: {
      opacity: 0,
      x: 50
    },
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      x: -50,
      transition: {
        duration: 0.3,
        ease: "easeIn"
      }
    }
  };

  // Logo animation variants
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

  // Feedback transition variants
  const feedbackVariants = {
    initial: {
      scale: 0.8,
      opacity: 0,
      rotate: -5
    },
    animate: {
      scale: 1,
      opacity: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25
      }
    },
    exit: {
      scale: 0.8,
      opacity: 0,
      rotate: 5,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black text-white font-sans">
      <AnimatedBackground />
      <motion.div 
        className="relative z-20 min-h-screen flex flex-col items-center justify-center py-8 px-4"
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <motion.img
          src={logo}
          alt="Trivify"
          className="h-54 max-h-56 mt-[-8rem] w-auto mb-8 cursor-pointer hover:opacity-80 transition-opacity"
          variants={logoVariants}
          initial="hidden"
          animate="visible"
          onClick={() => navigate('/')}
        />
        
        <div className="mb-8 mt-[-5rem] w-full max-w-3xl">
          <ProgressIndicator 
            currentQuestion={currentQuestion} 
            totalQuestions={questions.length} 
          />
        </div>

        <AnimatePresence mode="wait">
          {showFeedback ? (
            <motion.div
              key="feedback"
              variants={feedbackVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="flex flex-col items-center justify-center h-80 w-full max-w-3xl"
            >
              <motion.div 
                className={`text-9xl mb-4 ${isCorrect ? 'text-trivify-green' : 'text-trivify-red'}`}
                initial={{ rotate: 0 }}
                animate={{ 
                  rotate: isCorrect ? [0, 15, -15, 0] : [0, 20, -20, 0],
                  scale: [1, 1.2, 1]
                }}
                transition={{ 
                  duration: 0.8, 
                  ease: "easeInOut",
                  times: [0, 0.5, 1] 
                }}
              >
                {isCorrect ? '✓' : '✗'}
              </motion.div>
              
              <motion.h2 
                className="text-4xl font-bold text-white mb-3 font-sora"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
              >
                {isCorrect ? 'Correct!' : 'Wrong!'}
              </motion.h2>
              
              {!isCorrect && (
                <motion.p 
                  className="text-white/80 text-xl font-sora"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  The correct answer was: <span className="font-bold text-trivify-green">{currentQuestionData.correctAnswer}</span>
                </motion.p>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="question"
              variants={feedbackVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full flex justify-center"
            >
              <QuestionCard
                question={currentQuestionData}
                onAnswer={handleAnswer}
                onTimeUp={handleTimeUp}
                timeLimit={currentQuestionData.timeLimit}
                onTimeUpdate={handleTimeUpdate}
                questionNumber={currentQuestion + 1}
                totalQuestions={questions.length}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default GamePage;
