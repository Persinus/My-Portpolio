
'use client';

import * as React from 'react';
import { Bot, ScrollText, Wand2 } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

const themes = [
  {
    name: 'theme-fantasy',
    label: 'Fantasy',
    icon: <Wand2 className="mr-2 h-4 w-4" />,
  },
  {
    name: 'theme-cyberpunk',
    label: 'Cyberpunk',
    icon: <Bot className="mr-2 h-4 w-4" />,
  },
  {
    name: 'theme-dungeon',
    label: 'Dungeon',
    icon: <ScrollText className="mr-2 h-4 w-4" />,
  },
];

export function ThemeToggle() {
  const { setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-10 w-10" />;
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Wand2 className="h-5 w-5" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Change your world?</AlertDialogTitle>
          <AlertDialogDescription>
            Select a new theme to alter the appearance of your quest.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="py-4 space-y-2">
            {themes.map((t) => (
                 <AlertDialogAction key={t.name} asChild className="w-full justify-start">
                    <button onClick={() => setTheme(t.name)}>
                        {t.icon}
                        <span>{t.label}</span>
                    </button>
                </AlertDialogAction>
            ))}
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Stay</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
