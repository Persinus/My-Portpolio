'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

type FogWrapperProps = {
  children: ReactNode;
  className?: string;
};

const fogVariants = {
  hidden: {
    maskImage: 'radial-gradient(circle at center, transparent 0%, black 150px)',
    WebkitMaskImage: 'radial-gradient(circle at center, transparent 0%, black 150px)',
  },
  visible: {
    maskImage: 'radial-gradient(circle at center, transparent 80%, black 120%)',
    WebkitMaskImage: 'radial-gradient(circle at center, transparent 80%, black 120%)',
  },
};


export default function FogWrapper({ children, className }: FogWrapperProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      variants={fogVariants}
      className={cn('relative', className)}
    >
      {children}
    </motion.div>
  );
}
