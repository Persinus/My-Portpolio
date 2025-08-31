
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Terminal } from 'lucide-react';

const codeLines = [
  { bug: `const value = prseInt('123');`, fix: `const value = parseInt('123');` },
  { bug: `if (user.id = 1) { /* logic */ }`, fix: `if (user.id === 1) { /* logic */ }` },
  { bug: `return (<div>Hello</div)`, fix: `return (<div>Hello</div>);` },
  { bug: `const arr = [1, 2, 3]; arr.map(n => n + 1)`, fix: `const arr = [1, 2, 3]; arr.forEach(n => n + 1)` },
  { bug: `let x; if(true) { x = 5; } console.log(x);`, fix: `let x; if(true) { x = 5; }` },
  { bug: `function promise() { return new promise(...) }`, fix: `function promise() { return new Promise(...) }` },
  { bug: `color: 'blue;'`, fix: `color: 'blue',` },
  { bug: `const obj = {a:1, b;2}`, fix: `const obj = {a:1, b:2}` },
];

type FakeCodeEditorProps = {
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  bugsFixed: number;
};

export default function FakeCodeEditor({ onClick, bugsFixed }: FakeCodeEditorProps) {
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [isFixed, setIsFixed] = useState(false);
  const [shake, setShake] = useState(0);

  useEffect(() => {
    // Every time a bug is fixed (externally), reset the component for the next bug
    setIsFixed(false);
    setCurrentLineIndex(bugsFixed % codeLines.length);
  }, [bugsFixed]);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isFixed) {
      setIsFixed(true);
      onClick(e); // Propagate the click event
      setShake(prev => prev + 1); // Trigger shake animation
    }
  };

  const currentLine = codeLines[currentLineIndex];
  const displayCode = isFixed ? currentLine.fix : currentLine.bug;

  return (
    <motion.div
      key={shake}
      animate={{ x: [0, -5, 5, -5, 5, 0] }}
      transition={{ duration: 0.3 }}
      className="w-full font-code text-sm"
    >
      <div
        className="rounded-lg border-2 border-secondary bg-background/50 p-4 shadow-lg cursor-pointer transition-all duration-300 hover:border-primary/50"
        onClick={handleClick}
      >
        <div className="flex items-center gap-2 mb-4 text-muted-foreground border-b border-secondary pb-2">
            <Terminal />
            <span>bug-report.js</span>
        </div>
        <pre className="whitespace-pre-wrap">
          <code>
            {displayCode.split('').map((char, index) => {
              const charIsDifferent = isFixed && char !== currentLine.bug[index];
              return (
                <motion.span
                  key={index}
                  initial={{ opacity: 0.5 }}
                  animate={{ 
                    opacity: 1, 
                    color: charIsDifferent ? 'hsl(var(--primary))' : 'hsl(var(--foreground))',
                    scale: charIsDifferent ? [1, 1.2, 1] : 1
                  }}
                  transition={{ delay: charIsDifferent ? index * 0.02 : 0, duration: 0.4 }}
                  className={cn(isFixed && charIsDifferent && "font-bold")}
                >
                  {char}
                </motion.span>
              );
            })}
          </code>
        </pre>
        <div className={cn(
            "mt-4 text-center text-xs font-semibold uppercase transition-all duration-500",
            isFixed ? "text-green-500 opacity-100" : "text-red-500 opacity-50"
        )}>
            {isFixed ? "Bug Fixed!" : "Click to fix"}
        </div>
      </div>
    </motion.div>
  );
}

    