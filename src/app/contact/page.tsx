import ContactForm from '@/components/ContactForm';
import { Button } from '@/components/ui/button';
import { Github, Linkedin, Twitter } from 'lucide-react';
import Link from 'next/link';

const socialLinks = [
  { icon: <Github />, href: '#', label: 'GitHub' },
  { icon: <Linkedin />, href: '#', label: 'LinkedIn' },
  { icon: <Twitter />, href: '#', label: 'Twitter' },
];

export default function ContactPage() {
  return (
    <div className="container mx-auto py-12">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl">
          Final Boss: The Messenger
        </h1>
        <p className="mt-3 max-w-2xl mx-auto text-lg text-muted-foreground">
          Defeat this final challenge by sending me a message. Your quest awaits!
        </p>
      </div>
      <div className="mx-auto max-w-lg">
        <ContactForm />
        <div className="mt-8 text-center">
            <p className="mb-4 text-muted-foreground">Or find me on other platforms:</p>
            <div className="flex justify-center gap-4">
                {socialLinks.map(link => (
                    <Button key={link.label} asChild variant="outline" size="icon" className="glow-accent-hover transition-all hover:border-accent hover:text-accent">
                         <Link href={link.href} aria-label={link.label} target="_blank" rel="noopener noreferrer">
                            {link.icon}
                        </Link>
                    </Button>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
}
