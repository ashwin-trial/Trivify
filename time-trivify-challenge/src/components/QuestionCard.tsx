import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Question } from '../types/triviaTypes';
import Timer from './Timer';

interface QuestionCardProps {
  question: Question;
  onAnswer: (answer: string, timeSpent: number) => void;
  onTimeUp: () => void;
  timeLimit: number;
  onTimeUpdate: (timeLeft: number) => void;
  questionNumber: number;
  totalQuestions: number;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  onAnswer,
  onTimeUp,
  timeLimit,
  onTimeUpdate,
  questionNumber,
  totalQuestions,
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [timeSpent, setTimeSpent] = useState(0);
  const [isAnswering, setIsAnswering] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  
  useEffect(() => {
    setSelectedAnswer(null);
    setTimeSpent(0);
    setIsAnswering(false);
    setIsCorrect(null);
  }, [question]);
  
  const handleAnswer = (answer: string) => {
    if (isAnswering) return;
    
    setIsAnswering(true);
    setSelectedAnswer(answer);
    const isAnswerCorrect = answer === question.correctAnswer;
    setIsCorrect(isAnswerCorrect);
    
    // Play sound effect
    const sound = new Audio(isAnswerCorrect ? '/sounds/correct.mp3' : '/sounds/wrong.mp3');
    sound.play();
    
    onAnswer(answer, timeSpent);
  };
  
  const handleTimeout = () => {
    if (isAnswering) return;
    setIsAnswering(true);
    onTimeUp();
  };

  const handleTimeUpdate = (timeLeft: number) => {
    setTimeSpent(timeLimit - timeLeft);
    onTimeUpdate(timeLeft);
  };
  
  // Animation variants
  const cardVariants = {
    hidden: { 
      opacity: 0,
      y: 50,
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
        duration: 0.5
      }
    },
    exit: {
      opacity: 0,
      y: -50,
      scale: 0.95,
      filter: 'blur(10px)',
      transition: {
        duration: 0.3
      }
    }
  };

  const optionVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        type: 'spring',
        stiffness: 100
      }
    }),
    hover: {
      scale: 1.02,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 10
      }
    },
    tap: {
      scale: 0.98
    }
  };

  const feedbackVariants = {
    correct: {
      backgroundColor: 'rgba(34, 197, 94, 0.2)',
      borderColor: 'rgb(34, 197, 94)',
      scale: [1, 1.02, 1],
      transition: {
        duration: 0.3
      }
    },
    incorrect: {
      backgroundColor: 'rgba(239, 68, 68, 0.2)',
      borderColor: 'rgb(239, 68, 68)',
      scale: [1, 0.98, 1],
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <motion.div
      className="w-full max-w-2xl mx-auto p-6 rounded-2xl bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-xl border border-white/10 shadow-2xl"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      style={{
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), 0 2px 8px rgba(255, 255, 255, 0.1)'
      }}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex-1">
          <div className="text-sm text-white/60 mb-2 font-sora">
            Question {questionNumber} of {totalQuestions}
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-white/90 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
            {question.question}
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-white/70 text-sm">Time Left:</span>
          <Timer
            timeLimit={timeLimit}
            onTimeUp={handleTimeout}
            onTimeUpdate={handleTimeUpdate}
            isPaused={isAnswering}
          />
        </div>
      </div>
      
      <div className="space-y-4">
        {question.options.map((option, index) => {
          // Define option colors based on index
          const optionColors = [
            'from-trivify-green/20 to-trivify-green/10 border-trivify-green/30',
            'from-trivify-yellow/20 to-trivify-yellow/10 border-trivify-yellow/30',
            'from-trivify-red/20 to-trivify-red/10 border-trivify-red/30',
            'from-trivify-blue/20 to-trivify-blue/10 border-trivify-blue/30'
          ];
          
          return (
            <motion.button
              key={option}
              className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-300 bg-gradient-to-r ${
                selectedAnswer === option
                  ? isCorrect
                    ? 'bg-green-500/20 border-green-500 text-green-100'
                    : 'bg-red-500/20 border-red-500 text-red-100'
                  : `${optionColors[index]} text-white/90 hover:bg-opacity-30 hover:border-opacity-50`
              }`}
              onClick={() => handleAnswer(option)}
              disabled={isAnswering}
              variants={optionVariants}
              custom={index}
              whileHover="hover"
              whileTap="tap"
              animate={
                selectedAnswer === option
                  ? isCorrect
                    ? 'correct'
                    : 'incorrect'
                  : {}
              }
              style={{
                backdropFilter: 'blur(8px)',
                boxShadow: selectedAnswer === option
                  ? isCorrect
                    ? '0 0 20px rgba(34, 197, 94, 0.3)'
                    : '0 0 20px rgba(239, 68, 68, 0.3)'
                  : '0 4px 12px rgba(0, 0, 0, 0.1)'
              }}
            >
              <span className="font-medium">{option}</span>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
};

export default QuestionCard;
