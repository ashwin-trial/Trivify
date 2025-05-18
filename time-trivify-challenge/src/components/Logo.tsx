// NOTE: To match the reference image, add this to your index.html <head>:
// <link href="https://fonts.googleapis.com/css2?family=Luckiest+Guy&display=swap" rel="stylesheet">

import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  animate?: boolean;
}

const Logo: React.FC<LogoProps> = ({ size = 'md', className, animate = false }) => {
  const sizeClasses = {
    sm: 'text-2xl',
    md: 'text-4xl',
    lg: 'text-6xl',
    xl: 'text-7xl',
  };
  
  const letterColors = [
    'text-trivify-red',
    'text-trivify-pink',
    'text-trivify-yellow',
    'text-trivify-green',
    'text-trivify-blue',
    'text-trivify-orange',
    'text-trivify-purple',
  ];

  // Updated transforms for a sleeker, tighter look
  const letterTransforms = [
    'rotate-[-4deg] translate-y-[0px]',
    'rotate-[-2deg] translate-y-[1px] translate-x-[-2px]',
    'rotate-[1deg] translate-y-[-1px] translate-x-[-4px]',
    'rotate-[-2deg] translate-y-[1px] translate-x-[-6px]',
    'rotate-[2deg] translate-y-[-1px] translate-x-[-8px]',
    'rotate-[-1deg] translate-y-[0px] translate-x-[-10px]',
    'rotate-[3deg] translate-y-[0px] translate-x-[-12px]',
  ];

  const letters = ['T', 'R', 'I', 'V', 'I', 'F', 'Y'];
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.04, // Faster stagger for even tighter appearance
      }
    },
  };
  
  const letterVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: 'spring', stiffness: 500, damping: 20 }
    },
    hover: (i: number) => ({ 
      y: -3, 
      scale: 1.05,
      rotate: [0, 3, -3, 0],
      transition: { duration: 0.2, delay: i * 0.01 }
    })
  };

  const LogoWrapper = animate ? motion.h1 : 'h1';
  const LogoLetter = animate ? motion.span : 'span';
  
  return (
    <LogoWrapper 
      className={cn('font-black flex tracking-tighter relative', sizeClasses[size], className)}
      variants={animate ? containerVariants : undefined}
      initial={animate ? "hidden" : undefined}
      animate={animate ? "visible" : undefined}
    >
      {letters.map((letter, index) => (
        <LogoLetter
          key={index}
          className={cn(
            'inline-block transform transition-all',
            letterColors[index % letterColors.length],
            letterTransforms[index],
            'drop-shadow-[2px_2px_0px_rgba(0,0,0,0.9)]'
          )}
          style={{ 
            textShadow: '1px 1px 0px #000',
            zIndex: letters.length - index,
            originX: 0.5, 
            originY: 0.5
          }}
          variants={animate ? letterVariants : undefined}
          whileHover={animate ? letterVariants.hover(index) : undefined}
          custom={index}
        >
          {letter}
        </LogoLetter>
      ))}
    </LogoWrapper>
  );
};

export default Logo;
