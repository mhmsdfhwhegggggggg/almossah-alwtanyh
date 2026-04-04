import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function AnimatedSection({ 
  children, 
  className = '',
  delay = 0.1,
  yOffset = 20,
  fullWidth = false
}) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0, y: yOffset },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
        delay: delay,
        when: 'beforeChildren',
        staggerChildren: 0.1
      }
    }
  };

  return (
    <motion.section
      ref={ref}
      className={`py-12 md:py-20 ${!fullWidth ? 'container mx-auto px-4' : ''} ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
    >
      {children}
    </motion.section>
  );
}