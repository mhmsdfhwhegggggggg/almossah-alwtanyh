import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';

export default function Counter({ 
  end, 
  duration = 2.5, 
  prefix = '', 
  suffix = '', 
  decimals = 0,
  className = '' 
}) {
  const [count, setCount] = useState(0);
  const [isCounting, setIsCounting] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2, // Start counting when 20% of the element is visible
  });

  useEffect(() => {
    if (inView && !isCounting) {
      setIsCounting(true);
      
      // Simple counting animation
      const startValue = 0;
      const range = end - startValue;
      const minFrame = 30; // Minimum number of frames
      const maxFrame = 100; // Maximum number of frames
      
      // Calculate duration based on the number range
      const frameDuration = 1000 / 60; // 60fps
      const totalFrames = Math.min(
        maxFrame, 
        Math.max(minFrame, Math.abs(range) * 0.5)
      );
      
      let frame = 0;
      const counter = setInterval(() => {
        frame++;
        
        // Ease out function - slow down as we approach the end
        const progress = frame / totalFrames;
        const easeOutProgress = 1 - Math.pow(1 - progress, 3); // Cubic ease out
        
        const currentCount = Math.round(startValue + (range * easeOutProgress));
        setCount(currentCount);
        
        if (frame === totalFrames) {
          clearInterval(counter);
          setCount(end); // Ensure we end exactly at the target number
        }
      }, frameDuration);
      
      return () => clearInterval(counter);
    }
  }, [inView, end, isCounting]);

  // Format number with commas for thousands
  const formatNumber = (num) => {
    return new Intl.NumberFormat('ar-SA').format(num);
  };

  return (
    <motion.span 
      ref={ref}
      className={`inline-block ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: inView ? 1 : 0, 
        y: inView ? 0 : 20 
      }}
      transition={{ duration: 0.5 }}
    >
      {prefix}
      {formatNumber(count)}
      {suffix}
    </motion.span>
  );
}