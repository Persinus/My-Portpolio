
'use client';

import Link from 'next/link';
import { Gamepad2, ChevronDown } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import ScrollProgressBar from './ScrollProgressBar';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from './ui/button';

const navLinks = [
  { href: '/', label: 'Trang Chủ' },
  { href: '/portfolio', label: 'Dự Án' },
  { href: '/blog', label: 'Blog' },
  { 
    href: '/challenge', 
    label: 'Thử Thách',
    subLinks: [
        { href: '/challenge/ai-quiz', label: 'AI Code Quiz'},
        { href: '/challenge/2048', label: '2048: Phiên bản Dev'},
        { href: '/challenge/bug-bounty', label: 'Thợ Săn Bug'},
    ]
  },
  { href: '/contact', label: 'Liên Hệ' },
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
        
        <nav className="hidden md:flex items-center gap-4 text-sm">
          {navLinks.map((link) => {
             const isActive = (link.href === '/' && pathname === '/') || (link.href !== '/' && pathname.startsWith(link.href));
             
             if (link.subLinks) {
                 return (
                    <DropdownMenu key={link.href}>
                        <DropdownMenuTrigger asChild>
                             <Button
                                variant="ghost"
                                className={cn(
                                'font-semibold transition-colors hover:text-primary',
                                isActive ? 'text-primary' : 'text-muted-foreground'
                                )}
                            >
                                {link.label}
                                <ChevronDown className="relative top-[1px] ml-1 h-4 w-4 transition duration-200 group-data-[state=open]:rotate-180" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem asChild>
                                <Link href={link.href}>Challenge Arcade</Link>
                            </DropdownMenuItem>
                            {link.subLinks.map(subLink => (
                                <DropdownMenuItem key={subLink.href} asChild>
                                    <Link href={subLink.href}>{subLink.label}</Link>
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                 )
             }

             return (
                <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                        'font-semibold transition-colors hover:text-primary',
                        isActive ? 'text-primary' : 'text-muted-foreground'
                    )}
                >
                    {link.label}
                </Link>
             )
          })}
        </nav>

        <div className="flex flex-1 items-center justify-end space-x-4">
          <ThemeToggle />
        </div>
      </div>
      <ScrollProgressBar />
    </header>
  );
}
