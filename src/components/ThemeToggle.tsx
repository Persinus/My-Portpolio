'use client';

import * as React from 'react';
import { Bot, ScrollText, Wand2 } from 'lucide-react';
import { useTheme } from 'next-themes';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Skeleton } from './ui/skeleton';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

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
              <Button
                variant="ghost"
                size="icon"
                aria-label={`Switch to ${t.label} theme`}
                className={cn(
                    'h-8 w-8 rounded-full',
                    theme === t.name ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'
                )}
                onClick={() => setTheme(t.name)}
              >
                {t.icon}
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
