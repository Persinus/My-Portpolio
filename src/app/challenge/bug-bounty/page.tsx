
'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Zap, Bug, PlusCircle, Server, Coffee, Cpu, ShieldCheck } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const initialUpgrades = [
  { id: 'dev', name: 'Thuê Junior Dev', level: 0, baseCost: 15, cost: 15, sps: 0.1, icon: <Coffee className="text-blue-400" /> },
  { id: 'test', name: 'Test Tự Động', level: 0, baseCost: 100, cost: 100, sps: 1, icon: <ShieldCheck className="text-green-400" /> },
  { id: 'server', name: 'Server Nhanh Hơn', level: 0, baseCost: 1100, cost: 1100, sps: 8, icon: <Server className="text-purple-400" /> },
  { id: 'ai', name: 'AI Hỗ Trợ Code', level: 0, baseCost: 12000, cost: 12000, sps: 47, icon: <Cpu className="text-orange-400" /> },
];

const formatNumber = (num: number): string => {
  if (num < 1000) return num.toFixed(1);
  if (num < 1_000_000) return `${(num / 1000).toFixed(2)}K`;
  if (num < 1_000_000_000) return `${(num / 1_000_000).toFixed(2)}M`;
  return `${(num / 1_000_000_000).toFixed(2)}B`;
};

type FloatingNumber = {
  id: number;
  value: string;
  x: number;
  y: number;
  isCritical: boolean;
};

export default function BugBountyPage() {
  const [score, setScore] = useState(0);
  const [sps, setSps] = useState(0);
  const [upgrades, setUpgrades] = useState(initialUpgrades);
  const [floatingNumbers, setFloatingNumbers] = useState<FloatingNumber[]>([]);
  const [bugShake, setBugShake] = useState(0);

  // Power-up state
  const [isPowerUpActive, setIsPowerUpActive] = useState(false);
  const [powerUpPosition, setPowerUpPosition] = useState<{ top: string, left: string } | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const gameLoop = setInterval(() => {
      setScore(prevScore => prevScore + sps / 10);
    }, 100);

    const powerUpSpawner = setInterval(() => {
      if (!powerUpPosition && Math.random() < 0.1) { // 10% chance to spawn every 5 seconds
        setPowerUpPosition({
          top: `${Math.random() * 80 + 10}%`,
          left: `${Math.random() * 80 + 10}%`
        });
      }
    }, 5000);

    return () => {
      clearInterval(gameLoop);
      clearInterval(powerUpSpawner);
    };
  }, [sps, powerUpPosition]);

  const addFloatingNumber = (value: number, x: number, y: number, isCritical = false) => {
    const newFloatingNumber: FloatingNumber = { id: Date.now(), value: `+${value}`, x, y, isCritical };
    setFloatingNumbers(current => [...current, newFloatingNumber]);
    setTimeout(() => {
      setFloatingNumbers(current => current.filter(n => n.id !== newFloatingNumber.id));
    }, 2000);
  };

  const handleBugFixClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    let clickValue = 1;
    let isCritical = false;

    if (Math.random() < 0.1) { // 10% chance for a critical hit
      clickValue = Math.floor(Math.random() * 6) + 5; // 5 to 10 times the value
      isCritical = true;
    }
    
    if (isPowerUpActive) {
      clickValue *= 2;
    }

    setScore(score + clickValue);
    addFloatingNumber(clickValue, e.clientX, e.clientY, isCritical);
    setBugShake(s => s + 1);
  };

  const purchaseUpgrade = (upgradeId: string) => {
    const upgrade = upgrades.find(u => u.id === upgradeId);
    if (!upgrade || score < upgrade.cost) {
      toast({ title: "Không đủ điểm!", description: "Tiếp tục sửa bug đi nào.", variant: "destructive" });
      return;
    }

    setScore(score - upgrade.cost);

    const newUpgrades = upgrades.map(u => u.id === upgradeId
      ? { ...u, level: u.level + 1, cost: Math.floor(u.baseCost * Math.pow(1.15, u.level + 1)) }
      : u
    );
    setUpgrades(newUpgrades);

    const newSps = newUpgrades.reduce((total, u) => total + u.level * u.sps, 0);
    setSps(newSps);

    toast({
      title: `Đã nâng cấp ${upgrade.name}!`,
      description: `+${upgrade.sps.toFixed(1)} điểm/giây`,
      className: 'bg-green-500 text-white border-green-500'
    });
  };

  const activatePowerUp = () => {
    if (isPowerUpActive) return;

    setPowerUpPosition(null);
    setIsPowerUpActive(true);
    toast({
        title: "Cà Phê Tăng Lực!",
        description: "Điểm mỗi lần nhấp chuột x2 trong 10 giây!",
        className: 'bg-yellow-500 text-black border-yellow-500'
    });

    setTimeout(() => setIsPowerUpActive(false), 10000);
  }

  return (
    <div className="container mx-auto py-12 relative">
      <AnimatePresence>
        {floatingNumbers.map(num => (
          <motion.div
            key={num.id}
            initial={{ opacity: 1, y: 0, x: '-50%' }}
            animate={{ opacity: 0, y: -80 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className={cn(
                "fixed text-lg pointer-events-none font-bold",
                num.isCritical ? "text-yellow-400 text-3xl" : "text-primary"
            )}
            style={{ top: num.y, left: num.x }}
          >
            {num.value}
          </motion.div>
        ))}
      </AnimatePresence>

       <AnimatePresence>
        {powerUpPosition && (
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1, rotate: [0, 10, -10, 0] }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className="absolute z-10"
                style={{ top: powerUpPosition.top, left: powerUpPosition.left }}
            >
                <Button variant="ghost" size="icon" className="h-20 w-20" onClick={activatePowerUp}>
                    <Coffee className="h-16 w-16 text-yellow-600 drop-shadow-lg" />
                </Button>
            </motion.div>
        )}
       </AnimatePresence>

      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl">
          Thợ Săn Bug
        </h1>
        <p className="mt-3 max-w-2xl mx-auto text-lg text-muted-foreground">
          Nhấp vào con bug để sửa nó. Mua nâng cấp để tự động hóa công việc của bạn.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <div className="md:col-span-1 flex flex-col items-center gap-6">
            <Card className="w-full text-center">
                <CardHeader>
                    <CardTitle className="font-headline text-3xl">{formatNumber(score)}</CardTitle>
                    <CardDescription>Điểm</CardDescription>
                </CardHeader>
                 <CardContent>
                    <p className={cn("text-sm text-primary transition-all", isPowerUpActive && "text-yellow-400 font-bold")}>
                        {formatNumber(sps)} điểm / giây
                    </p>
                </CardContent>
            </Card>
            <motion.div 
                key={bugShake}
                animate={{ x: [0, -5, 5, -5, 5, 0] }}
                transition={{ duration: 0.3 }}
                whileTap={{ scale: 0.9 }}
            >
                <Button 
                    onClick={handleBugFixClick} 
                    className="h-48 w-48 rounded-full flex-col gap-2 text-2xl glow-primary"
                >
                    <Bug className="h-16 w-16"/>
                    Sửa Bug
                </Button>
            </motion.div>
        </div>

        <div className="md:col-span-2">
           <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">Nâng cấp</CardTitle>
                    <CardDescription>Mua nâng cấp để tăng điểm mỗi giây.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {upgrades.map(upgrade => (
                        <Card key={upgrade.id} className={cn("flex items-center p-4 transition-colors", score < upgrade.cost && "bg-muted/50 text-muted-foreground")}>
                            <div className="mr-4 text-2xl w-8 text-center">{upgrade.icon}</div>
                            <div className="flex-grow">
                                <h4 className="font-bold">{upgrade.name}</h4>
                                <p className="text-sm">Giá: {formatNumber(upgrade.cost)} | Cấp: {upgrade.level}</p>
                                <p className="text-xs text-primary">+{upgrade.sps.toFixed(1)} điểm/giây mỗi cấp</p>
                            </div>
                            <Button 
                                onClick={() => purchaseUpgrade(upgrade.id)}
                                disabled={score < upgrade.cost}
                                variant="outline"
                            >
                                <PlusCircle className="mr-2"/> Mua
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
