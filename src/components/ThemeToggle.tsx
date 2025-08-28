
'use client';

import * as React from 'react';
import { Bot, ScrollText, Wand2 } from 'lucide-react';
import { useTheme } from 'next-themes';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Wand2 className="h-5 w-5" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {themes.map((t) => (
           <DropdownMenuItem key={t.name} onClick={() => setTheme(t.name)}>
             {t.icon}
             <span>{t.label}</span>
           </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
