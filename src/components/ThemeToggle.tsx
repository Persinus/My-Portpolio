'use client';

import * as React from 'react';
import { Bot, ScrollText, Wand2 } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Skeleton } from './ui/skeleton';

const themes = [
  {
    name: 'theme-fantasy',
    label: 'Fantasy',
    icon: <Wand2 className="h-5 w-5" />,
  },
  {
    name: 'theme-cyberpunk',
    label: 'Cyberpunk',
    icon: <Bot className="h-5 w-5" />,
  },
  {
    name: 'theme-dungeon',
    label: 'Dungeon',
    icon: <ScrollText className="h-5 w-5" />,
  },
];

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
        <div className="flex items-center gap-1 rounded-full border bg-background p-1">
            {themes.map((t) => (
                <Skeleton key={t.name} className="h-8 w-8 rounded-full" />
            ))}
        </div>
    )
  }

  return (
    <TooltipProvider>
      <div className="flex items-center gap-1 rounded-full border bg-background p-1">
        {themes.map((t) => (
          <Tooltip key={t.name} delayDuration={0}>
            <TooltipTrigger asChild>
              <button
                aria-label={`Switch to ${t.label} theme`}
                className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors ${
                  theme === t.name
                    ? 'bg-secondary text-secondary-foreground'
                    : 'bg-transparent text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                }`}
                onClick={() => setTheme(t.name)}
              >
                {t.icon}
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{t.label}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
}
