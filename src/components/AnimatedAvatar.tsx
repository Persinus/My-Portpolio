'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function AnimatedAvatar() {
  return (
    <motion.div
      animate={{
        scale: [1, 1.05, 1],
        y: [0, -10, 0],
      }}
      transition={{
        duration: 4,
        ease: 'easeInOut',
        repeat: Infinity,
      }}
    >
      <Image
        src="https://avatars.githubusercontent.com/u/199482290?v=4"
        alt="Animated Avatar"
        width={200}
        height={200}
        data-ai-hint="avatar character"
        className="rounded-full border-4 border-primary glow-primary"
      />
    </motion.div>
  );
}
