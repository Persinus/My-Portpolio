'use client';

import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import { LevelUpToast } from './LevelUpToast';

export default function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  const { toast } = useToast();
  const [levelUpTriggered, setLevelUpTriggered] = useState(false);

  useEffect(() => {
    return scaleX.on("change", (latest) => {
      if (latest >= 1 && !levelUpTriggered) {
        setLevelUpTriggered(true);
        toast({
          duration: 5000,
          className: "bg-gradient-to-r from-purple-800 to-indigo-900 border-yellow-400",
          children: <LevelUpToast />,
        });
      } else if (latest < 1 && levelUpTriggered) {
        // Reset if user scrolls back up
        setLevelUpTriggered(false);
      }
    });
  }, [scaleX, toast, levelUpTriggered]);


  return <motion.div className="h-1 origin-left bg-primary glow-primary" style={{ scaleX }} />;
}
