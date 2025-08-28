'use client';

import * as React from 'react';
import { Monitor, Moon, Sun, Wand2, Puzzle, Bot } from 'lucide-react';
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
    icon: <Wand2 />,
  },
  {
    name: 'theme-cyberpunk',
    label: 'Cyberpunk',
    icon: <Bot />,
  },
  {
    name: 'theme-retro',
    label: 'Retro',
    icon: <Puzzle />,
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
          <Tooltip key={t.name}>
            <TooltipTrigger asChild>
              <Button
                variant={theme === t.name ? 'secondary' : 'ghost'}
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={() => setTheme(t.name)}
              >
                {t.icon}
                <span className="sr-only">{t.label}</span>
              </Button>
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
