
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import RippleEffect from '@/components/RippleEffect';

const games = [
  {
    title: 'AI Code Quiz',
    slug: '/challenge/ai-quiz',
    description: 'Test your knowledge against an AI that generates code questions.',
    image: 'https://picsum.photos/400/200',
    imageHint: 'AI code'
  },
  {
    title: '2048: Dev Edition',
    slug: '/challenge/2048',
    description: 'Merge tech logos to reach the ultimate goal. A classic game with a dev twist.',
    image: 'https://picsum.photos/400/200',
    imageHint: 'puzzle game'
  },
  {
    title: 'Bug Bounty Hunter',
    slug: '/challenge/bug-bounty',
    description: 'An idle/clicker game where you fix bugs to buy upgrades and automate your workflow.',
    image: 'https://picsum.photos/400/200',
    imageHint: 'code dashboard'
  },
];

export default function ChallengePage() {
  return (
    <div className="container mx-auto py-12">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl">
          Challenge Arcade
        </h1>
        <p className="mt-3 max-w-2xl mx-auto text-lg text-muted-foreground">
          Select a game to test your skills and have some fun.
        </p>
      </div>
      <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
        {games.map((game) => (
          <RippleEffect key={game.slug}>
            <Card className="flex h-full flex-col overflow-hidden border-2 border-primary/20 bg-card/50 backdrop-blur-sm">
                 <div className="relative h-48 w-full">
                    <Image
                        src={game.image}
                        alt={game.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        data-ai-hint={game.imageHint}
                        className="object-cover"
                    />
                </div>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">{game.title}</CardTitle>
                    <CardDescription>{game.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow" />
                <CardFooter>
                     <Button asChild className="glow-accent w-full">
                        <Link href={game.slug}>
                            Play Game <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </CardFooter>
            </Card>
          </RippleEffect>
        ))}
      </div>
    </div>
  );
}
