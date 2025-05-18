import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const AnimatedBackground: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 z-10 overflow-hidden">
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at center, rgba(236, 72, 153, 0.15) 0%, rgba(59, 130, 246, 0.1) 50%, rgba(234, 179, 8, 0.05) 100%)',
        }}
      />
      
      {/* Pink Blob */}
      <motion.div
        className="absolute w-[800px] h-[800px] rounded-full blur-[100px]"
        style={{
          background: 'radial-gradient(circle at center, rgba(236, 72, 153, 0.4) 0%, rgba(236, 72, 153, 0) 70%)',
          filter: 'blur(100px)',
        }}
        animate={{
          x: mousePosition.x - 400,
          y: mousePosition.y - 400,
          scale: [1, 1.1, 1],
        }}
        transition={{
          type: "spring",
          damping: 20,
          stiffness: 100,
          mass: 3,
          scale: {
            duration: 4,
            repeat: Infinity,
            repeatType: "reverse",
          }
        }}
      />

      {/* Blue Blob */}
      <motion.div
        className="absolute w-[700px] h-[700px] rounded-full blur-[100px]"
        style={{
          background: 'radial-gradient(circle at center, rgba(59, 130, 246, 0.4) 0%, rgba(59, 130, 246, 0) 70%)',
          filter: 'blur(100px)',
        }}
        animate={{
          x: mousePosition.x - 350 + 150,
          y: mousePosition.y - 350 - 150,
          scale: [1, 1.2, 1],
        }}
        transition={{
          type: "spring",
          damping: 20,
          stiffness: 100,
          mass: 3,
          delay: 0.2,
          scale: {
            duration: 5,
            repeat: Infinity,
            repeatType: "reverse",
          }
        }}
      />

      {/* Yellow Blob */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full blur-[100px]"
        style={{
          background: 'radial-gradient(circle at center, rgba(234, 179, 8, 0.4) 0%, rgba(234, 179, 8, 0) 70%)',
          filter: 'blur(100px)',
        }}
        animate={{
          x: mousePosition.x - 300 - 150,
          y: mousePosition.y - 300 + 150,
          scale: [1, 1.15, 1],
        }}
        transition={{
          type: "spring",
          damping: 20,
          stiffness: 100,
          mass: 3,
          delay: 0.4,
          scale: {
            duration: 4.5,
            repeat: Infinity,
            repeatType: "reverse",
          }
        }}
      />

      <div className="absolute inset-0 bg-black/20" />
    </div>
  );
};

export default AnimatedBackground; 