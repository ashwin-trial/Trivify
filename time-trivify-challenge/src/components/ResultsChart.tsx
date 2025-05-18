import React from 'react';
import { motion } from 'framer-motion';
import { Answer } from '../types/triviaTypes';

interface ResultsChartProps {
  answers: Answer[];
}

const ResultsChart: React.FC<ResultsChartProps> = ({ answers }) => {
  // Calculate statistics
  const totalQuestions = answers.length;
  const correctAnswers = answers.filter(a => a.isCorrect).length;
  const skippedAnswers = answers.filter(a => a.selectedAnswer === null).length;
  const incorrectAnswers = totalQuestions - correctAnswers - skippedAnswers;
  const answeredQuestions = totalQuestions - skippedAnswers;

  // Calculate average time for correct and incorrect answers
  const correctTimes = answers.filter(a => a.isCorrect).map(a => a.timeSpent);
  const incorrectTimes = answers.filter(a => !a.isCorrect && a.selectedAnswer !== null).map(a => a.timeSpent);
  
  const avgCorrectTime = correctTimes.length > 0 
    ? correctTimes.reduce((a, b) => a + b, 0) / correctTimes.length 
    : 0;
  
  const avgIncorrectTime = incorrectTimes.length > 0 
    ? incorrectTimes.reduce((a, b) => a + b, 0) / incorrectTimes.length 
    : 0;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const barVariants = {
    hidden: { scaleY: 0 },
    visible: {
      scaleY: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <motion.div 
      className="w-full space-y-3"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-gradient-to-br from-trivify-green/20 to-trivify-green/10 p-3 rounded-xl backdrop-blur-sm border border-trivify-green/30">
          <h3 className="text-xs font-semibold mb-2 font-sora">Correct Answers</h3>
          <div className="flex items-end space-x-2 h-16">
            <motion.div
              className="w-full bg-gradient-to-b from-trivify-green/40 to-trivify-green/20 rounded-t-lg"
              style={{ height: `${(correctAnswers / totalQuestions) * 100}%` }}
              variants={barVariants}
            />
            <span className="text-xl font-bold font-sora">{correctAnswers}</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-trivify-red/20 to-trivify-red/10 p-3 rounded-xl backdrop-blur-sm border border-trivify-red/30">
          <h3 className="text-xs font-semibold mb-2 font-sora">Incorrect Answers</h3>
          <div className="flex items-end space-x-2 h-16">
            <motion.div
              className="w-full bg-gradient-to-b from-trivify-red/40 to-trivify-red/20 rounded-t-lg"
              style={{ height: `${(incorrectAnswers / totalQuestions) * 100}%` }}
              variants={barVariants}
            />
            <span className="text-xl font-bold font-sora">{incorrectAnswers}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-gradient-to-br from-trivify-blue/20 to-trivify-blue/10 p-3 rounded-xl backdrop-blur-sm border border-trivify-blue/30">
          <h3 className="text-xs font-semibold mb-1 font-sora">Avg Time (Correct)</h3>
          <p className="text-xl font-bold font-sora">{avgCorrectTime.toFixed(1)}s</p>
        </div>

        <div className="bg-gradient-to-br from-trivify-yellow/20 to-trivify-yellow/10 p-3 rounded-xl backdrop-blur-sm border border-trivify-yellow/30">
          <h3 className="text-xs font-semibold mb-1 font-sora">Avg Time (Incorrect)</h3>
          <p className="text-xl font-bold font-sora">{avgIncorrectTime.toFixed(1)}s</p>
        </div>
      </div>

      {skippedAnswers > 0 && (
        <div className="bg-gradient-to-br from-trivify-pink/20 to-trivify-pink/10 p-3 rounded-xl backdrop-blur-sm border border-trivify-pink/30">
          <h3 className="text-xs font-semibold mb-1 font-sora">Skipped Questions</h3>
          <p className="text-xl font-bold font-sora">{skippedAnswers}</p>
        </div>
      )}
    </motion.div>
  );
};

export default ResultsChart;
