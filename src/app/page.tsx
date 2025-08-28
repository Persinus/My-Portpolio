import Link from 'next/link';
import { Button } from '@/components/ui/button';
import AnimatedAvatar from '@/components/AnimatedAvatar';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="container mx-auto flex h-full flex-col items-center justify-center text-center">
      <AnimatedAvatar />
      <h1 className="mt-8 font-headline text-5xl font-bold tracking-tighter sm:text-6xl md:text-7xl">
        Level Up Your Next Project
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-muted-foreground md:text-xl">
        Embark on a quest through my portfolio. Discover projects, unlock achievements, and lets build the future together.
      </p>
      <Button asChild size="lg" className="mt-8 glow-primary transition-all duration-300 hover:scale-105">
        <Link href="/portfolio">
          Start Game
          <ArrowRight className="ml-2 h-5 w-5" />
        </Link>
      </Button>
    </div>
  );
}
