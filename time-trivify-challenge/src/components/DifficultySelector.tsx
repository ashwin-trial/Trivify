
import React, { useState } from 'react';
import { Difficulty } from '@/types/triviaTypes';
import { cn } from '@/lib/utils';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { motion } from 'framer-motion';

interface DifficultySelectorProps {
  onSelect: (difficulty: Difficulty) => void;
}

const DifficultySelector: React.FC<DifficultySelectorProps> = ({ onSelect }) => {
  const [hoveredDifficulty, setHoveredDifficulty] = useState<Difficulty | null>(null);
  
  const difficulties: { value: Difficulty; label: string; color: string; desc: string }[] = [
    { 
      value: 'easy', 
      label: 'Easy', 
      color: 'bg-trivify-green',
      desc: 'Perfect for beginners. Mostly easy questions with generous time limits.'
    },
    { 
      value: 'medium', 
      label: 'Medium', 
      color: 'bg-trivify-yellow',
      desc: 'A balanced mix of questions. Moderate difficulty with reasonable time limits.'
    },
    { 
      value: 'hard', 
      label: 'Hard', 
      color: 'bg-trivify-red',
      desc: 'For trivia experts. Challenging questions with tight time constraints.'
    },
  ];

  // Overlay effect when card is hovered
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  // Card container animations
  const containerVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
        delay: 0.8 + custom * 0.2,
      }
    }),
    hover: {
      scale: 1.05,
      y: -10,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 10
      }
    },
    tap: {
      scale: 0.98,
      transition: { type: "spring", stiffness: 300, damping: 10 }
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {difficulties.map((difficulty, index) => (
        <HoverCard key={difficulty.value} openDelay={100} closeDelay={100}>
          <HoverCardTrigger asChild>
            <motion.div
              variants={containerVariants}
              custom={index}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              whileTap="tap"
              className="relative"
            >
              <motion.button
                onClick={() => onSelect(difficulty.value)}
                onMouseEnter={() => setHoveredDifficulty(difficulty.value)}
                onMouseLeave={() => setHoveredDifficulty(null)}
                className={cn(
                  'trivify-option w-full flex flex-col items-center justify-center p-8 rounded-2xl transition-all',
                  difficulty.color,
                  'shadow-lg'
                )}
              >
                <span className="text-3xl font-bold">{difficulty.label}</span>
              </motion.button>
            </motion.div>
          </HoverCardTrigger>
          <HoverCardContent 
            className={cn(
              "border-white/20 text-white p-4",
              {
                'bg-trivify-green bg-opacity-90': difficulty.value === 'easy',
                'bg-trivify-yellow bg-opacity-90': difficulty.value === 'medium',
                'bg-trivify-red bg-opacity-90': difficulty.value === 'hard',
              }
            )}
            side="top"
            align="center"
          >
            <p className="text-center">{difficulty.desc}</p>
          </HoverCardContent>
        </HoverCard>
      ))}
    </div>
  );
};

export default DifficultySelector;
