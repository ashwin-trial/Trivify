import React from 'react';
import { motion } from 'framer-motion';

interface ProgressIndicatorProps {
  currentQuestion: number;
  totalQuestions: number;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  currentQuestion,
  totalQuestions
}) => {
  const progress = (currentQuestion / totalQuestions) * 100;

  return (
    <div className="w-full bg-black bg-opacity-50 rounded-full h-2 overflow-hidden backdrop-blur-sm">
      <motion.div
        className="h-full bg-gradient-to-r from-trivify-pink via-trivify-yellow to-trivify-blue"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      />
    </div>
  );
};

export default ProgressIndicator;
