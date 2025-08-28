'use client';

import { Trophy, Zap } from "lucide-react";
import { motion } from "framer-motion";

export function LevelUpToast() {
  return (
    <div className="flex items-center gap-4">
        <motion.div 
            initial={{ scale: 0, rotate: -90 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 30}}
        >
            <Trophy className="h-10 w-10 text-yellow-400" />
        </motion.div>
        <div className="flex flex-col">
            <h3 className="font-headline text-lg font-bold text-yellow-400">Level Up!</h3>
            <p className="text-sm text-yellow-100">You've explored the entire area!</p>
        </div>
        <motion.div
            className="absolute -top-2 -right-2"
            animate={{ scale: [1, 1.2, 1], y: [0, -5, 0]}}
            transition={{ repeat: Infinity, duration: 1}}
        >
            <Zap className="h-6 w-6 text-yellow-400 fill-current"/>
        </motion.div>
    </div>
  );
}
