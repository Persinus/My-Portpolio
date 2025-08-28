
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useSound } from '@/hooks/useSound';
import { motion } from 'framer-motion';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from './ui/button';
import Image from 'next/image';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/blog', label: 'Blog' },
  { href: '/challenge', label: 'Challenge' },
  { href: '/contact', label: 'Contact' },
];

const gameLinks = [
    { href: '/challenge/ai-quiz', label: 'AI Code Quiz'},
    { href: '/challenge/2048', label: '2048: Dev Edition'},
    { href: '/challenge/bug-bounty', label: 'Bug Bounty Hunter'},
]

export default function DialogueNav() {
  const pathname = usePathname();
  const playNavigationSound = useSound('/audio/navigation.mp3');

  const isChallengePage = pathname.startsWith('/challenge');

  return (
    <nav className="hidden md:flex items-center justify-center p-2 rounded-lg bg-background/80 border border-primary/20 backdrop-blur-sm">
        <ul className="flex items-center gap-2">
            {navLinks.map(({ href, label }) => {
                const isActive = (href === '/' && pathname === '/') || (href !== '/' && pathname.startsWith(href));
                const isChallengeDropdown = label === 'Challenge';

                if (isChallengeDropdown) {
                    return (
                        <li key={href} className="relative">
                             <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className={cn(
                                        'px-4 py-2 text-sm font-semibold transition-colors hover:text-primary focus-visible:ring-0 focus-visible:ring-offset-0 focus:bg-primary/10',
                                        isChallengePage ? 'text-primary' : 'text-muted-foreground'
                                    )}>
                                        {isChallengePage && (
                                           <motion.div layoutId="selector" className="absolute -left-1">
                                               <Image src="/hand-cursor.svg" alt="selector" width={24} height={24} className="filter-primary" />
                                           </motion.div>
                                        )}
                                        <span className="ml-5">{label}</span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                     <DropdownMenuItem asChild>
                                         <Link href="/challenge" onClick={playNavigationSound}>Challenge Arcade</Link>
                                     </DropdownMenuItem>
                                    {gameLinks.map(({href: gameHref, label: gameLabel}) => (
                                        <DropdownMenuItem key={gameHref} asChild>
                                             <Link href={gameHref} onClick={playNavigationSound}>
                                                {gameLabel}
                                             </Link>
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </li>
                    )
                }

                return (
                    <li key={href} className="relative">
                        <Link
                            href={href}
                            onClick={playNavigationSound}
                            className={cn(
                                'block px-4 py-2 text-sm font-semibold transition-colors hover:text-primary',
                                isActive ? 'text-primary' : 'text-muted-foreground'
                            )}
                        >
                            {isActive && (
                                <motion.div layoutId="selector" className="absolute -left-1">
                                    <Image src="/hand-cursor.svg" alt="selector" width={24} height={24} className="filter-primary" />
                                </motion.div>
                            )}
                            <span className="ml-5">{label}</span>
                        </Link>
                    </li>
                )
            })}
        </ul>
    </nav>
  );
}
