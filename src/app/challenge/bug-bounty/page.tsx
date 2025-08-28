
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Zap, Bug, PlusCircle, Server, Coffee } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const initialUpgrades = [
  { id: 'dev', name: 'Hire Junior Dev', level: 0, baseCost: 15, cost: 15, sps: 0.1, icon: <Coffee className="text-blue-400" /> },
  { id: 'test', name: 'Automated Tests', level: 0, baseCost: 100, cost: 100, sps: 1, icon: <Zap className="text-green-400" /> },
  { id: 'server', name: 'Faster Servers', level: 0, baseCost: 1100, cost: 1100, sps: 8, icon: <Server className="text-purple-400" /> },
  { id: 'ai', name: 'AI Code Assistant', level: 0, baseCost: 12000, cost: 12000, sps: 47, icon: <Bug className="text-red-400" /> },
];

// Function to format large numbers
const formatNumber = (num: number): string => {
  if (num < 1000) return num.toFixed(1);
  if (num < 1_000_000) return `${(num / 1000).toFixed(2)}K`;
  if (num < 1_000_000_000) return `${(num / 1_000_000).toFixed(2)}M`;
  return `${(num / 1_000_000_000).toFixed(2)}B`;
};


export default function BugBountyPage() {
  const [score, setScore] = useState(0);
  const [sps, setSps] = useState(0); // Score Per Second
  const [upgrades, setUpgrades] = useState(initialUpgrades);
  const [lastClickValue, setLastClickValue] = useState<number | null>(null);
  const [clickPosition, setClickPosition] = useState<{ x: number, y: number } | null>(null);
  const { toast } = useToast();

  // Game loop for idle score generation
  useEffect(() => {
    const interval = setInterval(() => {
      setScore(prevScore => prevScore + sps / 10); // Update 10 times per second for smoother display
    }, 100);

    return () => clearInterval(interval);
  }, [sps]);

  const handleBugFixClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const clickValue = 1;
    setScore(score + clickValue);
    
    // For the floating number animation
    setLastClickValue(clickValue);
    setClickPosition({ x: e.clientX, y: e.clientY });
    setTimeout(() => setLastClickValue(null), 1000);
  };

  const purchaseUpgrade = (upgradeId: string) => {
    const upgrade = upgrades.find(u => u.id === upgradeId);
    if (!upgrade || score < upgrade.cost) {
      toast({ title: "Not enough points!", description: "Keep fixing those bugs.", variant: "destructive"});
      return;
    }

    setScore(score - upgrade.cost);
    
    const newUpgrades = upgrades.map(u => {
        if (u.id === upgradeId) {
            return {
                ...u,
                level: u.level + 1,
                cost: Math.floor(u.baseCost * Math.pow(1.15, u.level + 1))
            };
        }
        return u;
    });
    
    setUpgrades(newUpgrades);

    const newSps = newUpgrades.reduce((total, u) => total + u.level * u.sps, 0);
    setSps(newSps);

     toast({
        title: `Upgraded ${upgrade.name}!`,
        description: `+${upgrade.sps.toFixed(1)} points/sec`,
        className: 'bg-green-500 text-white border-green-500'
      });
  };

  return (
    <div className="container mx-auto py-12">
      <AnimatePresence>
        {lastClickValue && clickPosition && (
          <motion.div
            key={Date.now()}
            initial={{ opacity: 1, y: 0, x: '-50%' }}
            animate={{ opacity: 0, y: -50 }}
            transition={{ duration: 1 }}
            className="fixed text-primary font-bold text-lg pointer-events-none"
            style={{ top: clickPosition.y, left: clickPosition.x }}
          >
            +1
          </motion.div>
        )}
      </AnimatePresence>
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl">
          Bug Bounty Hunter
        </h1>
        <p className="mt-3 max-w-2xl mx-auto text-lg text-muted-foreground">
          Click the bug to fix it. Buy upgrades to automate your workflow.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {/* Main Clicker Section */}
        <div className="md:col-span-1 flex flex-col items-center gap-6">
            <Card className="w-full text-center">
                <CardHeader>
                    <CardTitle className="font-headline text-3xl">{formatNumber(score)}</CardTitle>
                    <CardDescription>Points</CardDescription>
                </CardHeader>
                 <CardContent>
                    <p className="text-sm text-primary">{formatNumber(sps)} points / second</p>
                </CardContent>
            </Card>
            <motion.div whileTap={{ scale: 0.9 }}>
                <Button 
                    onClick={handleBugFixClick} 
                    className="h-48 w-48 rounded-full flex-col gap-2 text-2xl glow-primary"
                >
                    <Bug className="h-16 w-16"/>
                    Fix Bug
                </Button>
            </motion.div>
        </div>

        {/* Upgrades Section */}
        <div className="md:col-span-2">
           <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">Upgrades</CardTitle>
                    <CardDescription>Purchase upgrades to increase your points-per-second.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {upgrades.map(upgrade => (
                        <Card key={upgrade.id} className={cn("flex items-center p-4 transition-colors", score < upgrade.cost && "bg-muted/50 text-muted-foreground")}>
                            <div className="mr-4 text-accent">{upgrade.icon}</div>
                            <div className="flex-grow">
                                <h4 className="font-bold">{upgrade.name}</h4>
                                <p className="text-sm">Cost: {formatNumber(upgrade.cost)} | Level: {upgrade.level}</p>
                            </div>
                            <Button 
                                onClick={() => purchaseUpgrade(upgrade.id)}
                                disabled={score < upgrade.cost}
                                variant="outline"
                            >
                                <PlusCircle className="mr-2"/> Buy
                            </Button>
                        </Card>
                    ))}
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}

