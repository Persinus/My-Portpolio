
'use client';

import Link from 'next/link';
import { Gamepad2 } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import ScrollProgressBar from './ScrollProgressBar';
import DialogueNav from './DialogueNav';


export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Gamepad2 className="h-6 w-6 text-primary glow-primary" />
          <span className="font-bold font-headline sm:inline-block">
            Portfolio Quest
          </span>
        </Link>
        
        <div className="flex-grow flex justify-center">
            <DialogueNav />
        </div>

        <div className="flex items-center justify-end space-x-4">
          <ThemeToggle />
        </div>
      </div>
      <ScrollProgressBar />
    </header>
  );
}
