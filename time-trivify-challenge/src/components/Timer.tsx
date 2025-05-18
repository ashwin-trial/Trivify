import React, { useState, useEffect, useRef } from 'react';
import { motion, Variants } from 'framer-motion';

interface TimerProps {
  timeLimit: number;
  onTimeUp: () => void;
  onTimeUpdate: (timeLeft: number) => void;
  isPaused: boolean;
}

const Timer: React.FC<TimerProps> = ({ timeLimit, onTimeUp, onTimeUpdate, isPaused }) => {
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const [isWarning, setIsWarning] = useState(false);
  const [isDanger, setIsDanger] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(Date.now());
  
  useEffect(() => {
    setTimeLeft(timeLimit);
    startTimeRef.current = Date.now();
    setIsWarning(false);
    setIsDanger(false);
  }, [timeLimit]);
  
  useEffect(() => {
    if (isPaused) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      return;
    }

    intervalRef.current = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
      const remaining = Math.max(0, timeLimit - elapsed);
      
      setTimeLeft(remaining);
      onTimeUpdate(remaining);
        
      // Set warning state at 30% of time
      if (remaining <= timeLimit * 0.3 && !isWarning) {
          setIsWarning(true);
        }
        
      // Set danger state at 15% of time
      if (remaining <= timeLimit * 0.15 && !isDanger) {
          setIsDanger(true);
      }

      if (remaining === 0) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          }
        onTimeUp();
      }
    }, 100);
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [timeLimit, onTimeUp, onTimeUpdate, isPaused, isWarning, isDanger]);
  
  const progress = (timeLeft / timeLimit) * 100;
  const colorClass = isDanger 
    ? 'text-red-500' 
    : isWarning 
      ? 'text-yellow-500' 
      : 'text-green-500';

  const shakeVariants: Variants = {
    shake: {
      x: [0, -2, 2, -2, 2, 0],
      transition: {
        duration: 0.5,
        repeat: isDanger ? Infinity : 0,
        repeatType: "loop" as const
      }
    }
  };

  const flashVariants: Variants = {
    flash: {
      opacity: [1, 0.5, 1],
      transition: {
        duration: 0.5,
        repeat: isDanger ? Infinity : 0,
        repeatType: "loop" as const
      }
    }
  };
  
  return (
    <motion.div 
      className={`flex items-center gap-2 ${colorClass}`}
      variants={shakeVariants}
      animate={isDanger ? "shake" : ""}
    >
      <motion.div 
        className="relative w-12 h-12"
        variants={flashVariants}
        animate={isDanger ? "flash" : ""}
      >
        <svg className="w-full h-full" viewBox="0 0 36 36">
          <path
            d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeDasharray={`${progress}, 100`}
            className="transform -rotate-90 origin-center"
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-sm font-bold">
          {timeLeft}
        </span>
      </motion.div>
    </motion.div>
  );
};

export default Timer;
