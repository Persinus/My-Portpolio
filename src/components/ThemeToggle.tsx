
'use client';

import * as React from 'react';
import { Bot, ScrollText, Wand2 } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
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
    // Return a placeholder to prevent layout shift
    return <div className="h-10 w-10" />;
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Wand2 className="h-5 w-5" />
          <span className="sr-only">Đổi giao diện</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Thay đổi thế giới của bạn?</AlertDialogTitle>
          <AlertDialogDescription>
            Chọn một giao diện mới để thay đổi diện mạo cho cuộc hành trình của bạn.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="py-4 space-y-2">
            {themes.map((t) => (
              <Button 
                key={t.name}
                onClick={() => setTheme(t.name)} 
                variant="outline" 
                className="w-full justify-start"
              >
                  {t.icon}
                  <span>{t.label}</span>
              </Button>
            ))}
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button variant="ghost">Ở lại</Button>
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
