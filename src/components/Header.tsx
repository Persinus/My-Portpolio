'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Gamepad2 } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import ScrollProgressBar from './ScrollProgressBar';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
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
              className={cn(
                'transition-colors hover:text-primary',
                (pathname.startsWith(href) && href !== '/') || pathname === href ? 'text-primary font-semibold' : 'text-muted-foreground'
              )}
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <ThemeToggle />
        </div>
      </div>
      <ScrollProgressBar />
    </header>
  );
}
