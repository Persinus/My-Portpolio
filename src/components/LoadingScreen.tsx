'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gamepad2 } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const loadingTips = [
    "Tip: Press Ctrl+B to toggle the sidebar.",
    "Hint: There's a secret code hidden somewhere... ↑↑↓↓←→←→BA",
    "Did you know? This portfolio was built with Next.js and Genkit.",
    "Loading awesome projects... please wait.",
    "Compiling shaders... just kidding!",
    "Reticulating splines...",
    "Waking up the AI assistant...",
];

const SESSION_STORAGE_KEY = 'loadingScreenShown';

export default function LoadingScreen() {
    const [progress, setProgress] = useState(0);
    const [currentTip, setCurrentTip] = useState('');
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const hasBeenShown = sessionStorage.getItem(SESSION_STORAGE_KEY);
        if (!hasBeenShown) {
            setIsVisible(true);
            sessionStorage.setItem(SESSION_STORAGE_KEY, 'true');
        }
    }, []);

    useEffect(() => {
        if (!isVisible) return;
        
        setCurrentTip(loadingTips[Math.floor(Math.random() * loadingTips.length)]);

        const tipInterval = setInterval(() => {
            setCurrentTip(loadingTips[Math.floor(Math.random() * loadingTips.length)]);
        }, 2000);

        const progressInterval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(progressInterval);
                    clearInterval(tipInterval);
                    setTimeout(() => setIsVisible(false), 500);
                    return 100;
                }
                return prev + 1;
            });
        }, 30);

        return () => {
            clearInterval(tipInterval);
            clearInterval(progressInterval);
        };
    }, [isVisible]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-background"
                >
                    <div className="flex flex-col items-center gap-4 text-center">
                        <motion.div
                            animate={{ rotate: [0, 360] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        >
                            <Gamepad2 className="h-16 w-16 text-primary glow-primary" />
                        </motion.div>
                        <h1 className="text-3xl font-headline font-bold">Portfolio Quest</h1>
                        <div className="w-80 max-w-full px-4">
                            <Progress value={progress} className="h-2" />
                            <p className="mt-4 text-sm text-muted-foreground h-10">{currentTip}</p>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
