'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

type PageTransitionWrapperProps = {
  children: ReactNode;
};

export default function PageTransitionWrapper({ children }: PageTransitionWrapperProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 15 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className="flex h-full flex-col"
    >
      {children}
    </motion.div>
  );
}
