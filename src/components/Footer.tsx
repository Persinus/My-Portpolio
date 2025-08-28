import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Github, Linkedin, Twitter, Gamepad2 } from 'lucide-react';

const socialLinks = [
  { icon: <Github />, href: '#', label: 'GitHub' },
  { icon: <Linkedin />, href: '#', label: 'LinkedIn' },
  { icon: <Twitter />, href: '#', label: 'Twitter' },
];

export default function Footer() {
  return (
    <footer className="w-full border-t border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 py-6 sm:flex-row">
        <div className="flex items-center space-x-2">
           <Gamepad2 className="h-6 w-6 text-primary glow-primary" />
           <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Portfolio Quest. All rights reserved.
          </p>
        </div>
        <div className="flex items-center gap-4">
            {socialLinks.map(link => (
                <Button key={link.label} asChild variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
                      <Link href={link.href} aria-label={link.label} target="_blank" rel="noopener noreferrer">
                        {link.icon}
                    </Link>
                </Button>
            ))}
        </div>
      </div>
    </footer>
  );
}
