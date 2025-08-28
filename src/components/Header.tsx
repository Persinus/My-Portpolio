
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Gamepad2, ChevronDown } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import ScrollProgressBar from './ScrollProgressBar';
import { useSound } from '@/hooks/useSound';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from './ui/button';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
];

const gameLinks = [
    { href: '/challenge', label: 'Challenge Arcade'},
    { href: '/challenge/ai-quiz', label: 'AI Code Quiz'},
    { href: '/challenge/2048', label: '2048: Dev Edition'},
    { href: '/challenge/bug-bounty', label: 'Bug Bounty Hunter'},
]

export default function Header() {
  const pathname = usePathname();
  const playNavigationSound = useSound('/audio/navigation.mp3');

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2" onClick={playNavigationSound}>
          <Gamepad2 className="h-6 w-6 text-primary glow-primary" />
          <span className="font-bold font-headline sm:inline-block">
            Portfolio Quest
          </span>
        </Link>
        <nav className="hidden flex-1 items-center space-x-6 text-sm font-medium md:flex">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={playNavigationSound}
              className={cn(
                'transition-colors hover:text-primary',
                pathname.startsWith(href) && href !== '/' || pathname === href ? 'text-primary font-semibold' : 'text-muted-foreground'
              )}
            >
              {label}
            </Link>
          ))}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className={cn(
                        'flex items-center gap-1 p-0 h-auto text-sm font-medium transition-colors hover:text-primary focus-visible:ring-0',
                        pathname.startsWith('/challenge') ? 'text-primary font-semibold' : 'text-muted-foreground'
                    )}>
                        Challenge <ChevronDown className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    {gameLinks.map(({href, label}) => (
                        <DropdownMenuItem key={href} asChild>
                             <Link href={href} onClick={playNavigationSound}>
                                {label}
                             </Link>
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <ThemeToggle />
        </div>
      </div>
      <ScrollProgressBar />
    </header>
  );
}
