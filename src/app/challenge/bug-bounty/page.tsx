
'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Award, Bug, Coffee, History, TrendingUp, Atom, Gamepad2, Star, CheckCircle2, ShoppingCart, List, LayoutGrid } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import StatsDisplay from '@/components/bug-bounty/StatsDisplay';
import UpgradeCard from '@/components/bug-bounty/UpgradeCard';
import AchievementsDialog from '@/components/bug-bounty/AchievementsDialog';
import { type Achievement, checkAchievements, initialAchievements } from '@/components/bug-bounty/achievements';
import { useSound } from '@/hooks/useSound';
import Image from 'next/image';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';


// --- Helper Functions and Initial State ---

const formatNumber = (num: number): string => {
  if (num < 1000) return num.toFixed(1);
  if (num < 1_000_000) return `${(num / 1000).toFixed(2)}K`;
  if (num < 1_000_000_000) return `${(num / 1_000_000).toFixed(2)}M`;
  return `${(num / 1_000_000_000).toFixed(2)}B`;
};

const initialSpsUpgrades = [
  { id: 'dev', name: 'Thuê Junior Dev', baseCost: 15, sps: 0.1, icon: <Coffee className="text-blue-400" /> },
  { id: 'test', name: 'Test Tự Động', baseCost: 100, sps: 1, icon: <CheckCircle2 className="text-green-400" /> },
  { id: 'server', name: 'Server Nhanh Hơn', baseCost: 1100, sps: 8, icon: <TrendingUp className="text-purple-400" /> },
  { id: 'ai', name: 'AI Hỗ Trợ Code', baseCost: 12000, sps: 47, icon: <Atom className="text-orange-400" /> },
];

const initialClickUpgrades = [
  { id: 'mouse', name: 'Chuột Gaming', baseCost: 10, clickMultiplier: 1, icon: <Gamepad2 className="text-yellow-400" /> },
  { id: 'keyboard', name: 'Bàn Phím Cơ', baseCost: 150, clickMultiplier: 5, icon: <Star className="text-red-400" /> },
  { id: 'ide', name: 'IDE xịn', baseCost: 2000, clickMultiplier: 50, icon: <List className="text-teal-400" /> },
];

type FloatingNumber = { id: number; value: string; x: number; y: number; isCritical: boolean };
type RandomEvent = { id: string, message: string, effect: () => void, duration: number };

const SAVE_GAME_KEY = 'portfolio_quest_bug_bounty_save';

export default function BugBountyPage() {
  // --- State Hooks ---
  const [score, setScore] = useState(0);
  const [stats, setStats] = useState({ totalScore: 0, totalClicks: 0, bugsFixed: 0, prestigeCount: 0 });
  const [sps, setSps] = useState(0);
  const [clickPower, setClickPower] = useState(1);
  const [spsUpgrades, setSpsUpgrades] = useState(() => initialSpsUpgrades.map(u => ({ ...u, level: 0, cost: u.baseCost })));
  const [clickUpgrades, setClickUpgrades] = useState(() => initialClickUpgrades.map(u => ({ ...u, level: 0, cost: u.baseCost })));
  const [floatingNumbers, setFloatingNumbers] = useState<FloatingNumber[]>([]);
  const [isPowerUpActive, setIsPowerUpActive] = useState(false);
  const [powerUpPosition, setPowerUpPosition] = useState<{ top: string, left: string } | null>(null);
  const [prestigePoints, setPrestigePoints] = useState(0);
  const [isPrestigeReady, setIsPrestigeReady] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<Omit<RandomEvent, 'effect'> | null>(null);
  const [bossBug, setBossBug] = useState<{ hp: number, maxHp: number } | null>(null);
  const [achievements, setAchievements] = useState<Achievement[]>(initialAchievements);
  const [isAchievementsOpen, setIsAchievementsOpen] = useState(false);

  const { toast } = useToast();

  const prestigeBonus = useMemo(() => 1 + (prestigePoints * 0.1), [prestigePoints]);
  
  // --- Sound Effects ---
  const playClickSound = useSound('/audio/click.mp3', 0.3);
  const playCritSound = useSound('/audio/crit.mp3', 0.5);
  const playUpgradeSound = useSound('/audio/upgrade.mp3', 0.4);
  const playAchievementSound = useSound('/audio/achievement.mp3', 0.6);

  // --- Save/Load Game Logic ---
  const saveGame = useCallback(() => {
    try {
        const gameState = {
            score,
            stats,
            spsUpgrades: spsUpgrades.map(u => ({ id: u.id, level: u.level })),
            clickUpgrades: clickUpgrades.map(u => ({ id: u.id, level: u.level })),
            prestigePoints,
            achievements,
            lastSaveTime: Date.now()
        };
        localStorage.setItem(SAVE_GAME_KEY, JSON.stringify(gameState));
    } catch (error) {
        console.error("Failed to save game:", error);
    }
  }, [score, stats, spsUpgrades, clickUpgrades, prestigePoints, achievements]);

  const loadGame = useCallback(() => {
    try {
        const savedStateJSON = localStorage.getItem(SAVE_GAME_KEY);
        if (!savedStateJSON) {
            console.log("No save file found, starting new game.");
            return;
        };

        const savedState = JSON.parse(savedStateJSON);

        const newSpsUpgrades = initialSpsUpgrades.map(u => {
            const savedUpgrade = savedState.spsUpgrades.find(su => su.id === u.id);
            const level = savedUpgrade ? savedUpgrade.level : 0;
            return { ...u, level, cost: Math.floor(u.baseCost * Math.pow(1.15, level)) };
        });

        const newClickUpgrades = initialClickUpgrades.map(u => {
            const savedUpgrade = savedState.clickUpgrades.find(su => su.id === u.id);
            const level = savedUpgrade ? savedUpgrade.level : 0;
            return { ...u, level, cost: Math.floor(u.baseCost * Math.pow(1.15, level)) };
        });

        setSpsUpgrades(newSpsUpgrades);
        setClickUpgrades(newClickUpgrades);
        setStats(savedState.stats);
        setPrestigePoints(savedState.prestigePoints);
        setAchievements(savedState.achievements);
        
        const newSps = newSpsUpgrades.reduce((total, u) => total + u.level * u.sps, 0);
        setSps(newSps);
        const newClickPower = newClickUpgrades.reduce((total, u) => total + u.level * u.clickMultiplier, 1);
        setClickPower(newClickPower);
        
        const timeSinceLastSave = Date.now() - (savedState.lastSaveTime || Date.now());
        const offlineSeconds = Math.max(0, timeSinceLastSave / 1000);
        const offlineEarnings = offlineSeconds * newSps * (1 + (savedState.prestigePoints * 0.1)) * 0.5; // 50% offline earning
        const finalScore = savedState.score + offlineEarnings;
        setScore(finalScore);

        if (offlineEarnings > 1) {
            toast({
                title: "Chào Mừng Trở Lại!",
                description: `Bạn đã kiếm được ${formatNumber(offlineEarnings)} điểm khi vắng mặt!`,
                className: 'bg-green-500 text-white border-green-500'
            });
        }
        
    } catch (error) {
        console.error("Failed to load game:", error);
        toast({ title: "Lỗi tải game", description: "Không thể tải tiến trình đã lưu, bắt đầu game mới.", variant: "destructive" });
    }
  }, [toast]);

  // --- Game Loop and Timers ---
  useEffect(() => {
    loadGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const gameLoop = setInterval(() => {
      const spsWithBonus = sps * prestigeBonus;
      setScore(prevScore => prevScore + spsWithBonus / 10);
      setStats(prev => ({ ...prev, totalScore: prev.totalScore + spsWithBonus / 10 }));
    }, 100);

    const powerUpSpawner = setInterval(() => {
      if (!powerUpPosition && !bossBug && Math.random() < 0.1) {
        setPowerUpPosition({ top: `${Math.random() * 80 + 10}%`, left: `${Math.random() * 80 + 10}%` });
      }
    }, 5000);

    const randomEventSpawner = setInterval(() => {
        if (!currentEvent && Math.random() < 0.05) { // 5% chance every 10s
            triggerRandomEvent();
        }
    }, 10000);

    const bossBugSpawner = setInterval(() => {
        if (!bossBug && !currentEvent && Math.random() < 0.03) {
            spawnBossBug();
        }
    }, 20000);

    const saveInterval = setInterval(() => {
        saveGame();
    }, 5000);

    return () => {
      clearInterval(gameLoop);
      clearInterval(powerUpSpawner);
      clearInterval(randomEventSpawner);
      clearInterval(bossBugSpawner);
      clearInterval(saveInterval);
    };
  }, [sps, prestigeBonus, powerUpPosition, currentEvent, bossBug, saveGame]);

  useEffect(() => {
    setIsPrestigeReady(stats.totalScore >= 1_000_000);
  }, [stats.totalScore]);

  useEffect(() => {
    const newAchievements = checkAchievements(achievements, stats, spsUpgrades, clickUpgrades);
    const newlyAchieved = newAchievements.find((ach, i) => ach.unlocked && !achievements[i].unlocked);
    if (newlyAchieved) {
      setAchievements(newAchievements);
      playAchievementSound();
      toast({
        title: "Đạt thành tựu mới!",
        description: newlyAchieved.name,
        className: 'bg-yellow-500 text-black border-yellow-500'
      });
    }
  }, [stats, achievements, toast, spsUpgrades, clickUpgrades, playAchievementSound]);

  // --- Core Game Logic ---

  const addFloatingNumber = useCallback((value: number, x: number, y: number, isCritical = false) => {
    const newFloatingNumber: FloatingNumber = { id: Date.now(), value: `+${formatNumber(value)}`, x, y, isCritical };
    setFloatingNumbers(current => [...current, newFloatingNumber]);
    setTimeout(() => {
      setFloatingNumbers(current => current.filter(n => n.id !== newFloatingNumber.id));
    }, 2000);
  }, []);

  const handleBugFixClick = (e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>) => {
    if (bossBug) {
        handleBossClick(e);
        return;
    }
    
    let baseClickValue = clickPower * prestigeBonus;
    let isCritical = false;

    if (Math.random() < 0.1) {
      baseClickValue *= Math.floor(Math.random() * 6) + 5;
      isCritical = true;
      playCritSound();
    } else {
      playClickSound();
    }

    if (isPowerUpActive) baseClickValue *= 2;

    setScore(score + baseClickValue);
    setStats(prev => ({ ...prev, totalScore: prev.totalScore + baseClickValue, totalClicks: prev.totalClicks + 1, bugsFixed: prev.bugsFixed + 1}));
    addFloatingNumber(baseClickValue, e.clientX, e.clientY, isCritical);
  };
  
  const purchaseUpgrade = (id: string, type: 'sps' | 'click') => {
    const isSps = type === 'sps';
    const upgrades = isSps ? spsUpgrades : clickUpgrades;
    const setter = isSps ? setSpsUpgrades : setClickUpgrades;

    const upgrade = upgrades.find(u => u.id === id);
    if (!upgrade || score < upgrade.cost) {
      toast({ title: "Không đủ điểm!", description: "Tiếp tục sửa bug đi nào.", variant: "destructive" });
      return;
    }

    playUpgradeSound();
    setScore(score - upgrade.cost);

    const newUpgrades = upgrades.map(u => u.id === id
      ? { ...u, level: u.level + 1, cost: Math.floor(u.baseCost * Math.pow(1.15, u.level + 1)) }
      : u
    );
    setter(newUpgrades as any); // Type assertion needed here

    if (isSps) {
      const newSps = newUpgrades.reduce((total, u) => total + u.level * (u as any).sps, 0);
      setSps(newSps);
    } else {
      const newClickPower = newUpgrades.reduce((total, u) => total + u.level * (u as any).clickMultiplier, 1);
      setClickPower(newClickPower);
    }
  };

  const handlePrestige = () => {
    if (!isPrestigeReady) return;
    playAchievementSound();
    setScore(0);
    setSps(0);
    setClickPower(1);
    setSpsUpgrades(initialSpsUpgrades.map(u => ({ ...u, level: 0, cost: u.baseCost })));
    setClickUpgrades(initialClickUpgrades.map(u => ({ ...u, level: 0, cost: u.baseCost })));
    setPrestigePoints(prev => prev + 1);
    setStats(prev => ({...prev, prestigeCount: prev.prestigeCount + 1, totalScore: 0})); // keep totalClicks and bugsFixed
    toast({
        title: "Tái Sinh Thành Công!",
        description: `Bạn nhận được +10% sản lượng điểm vĩnh viễn!`,
        className: 'bg-purple-600 text-white border-purple-500'
    });
  }

  // --- Power-ups and Events ---

  const activatePowerUp = () => {
    if (isPowerUpActive) return;
    setPowerUpPosition(null);
    setIsPowerUpActive(true);
    playUpgradeSound();
    toast({
        title: "Cà Phê Tăng Lực!",
        description: "Điểm mỗi lần nhấp chuột x2 trong 10 giây!",
        className: 'bg-yellow-500 text-black border-yellow-500'
    });
    setTimeout(() => setIsPowerUpActive(false), 10000);
  }

  const triggerRandomEvent = () => {
    const events: RandomEvent[] = [
        { id: 'deadline', message: "Deadline Gấp! Click x3 trong 15 giây!", duration: 15000, effect: () => setClickPower(p => p * 3) },
        { id: 'server_crash', message: "Server Sập! SPS giảm 50% trong 30 giây!", duration: 30000, effect: () => setSps(s => s / 2) },
    ];
    const event = events[Math.floor(Math.random() * events.length)];
    setCurrentEvent(event);
    event.effect();
    toast({ title: "Sự Kiện Bất Ngờ!", description: event.message, variant: "destructive" });
    setTimeout(() => {
        // Revert effect
        if (event.id === 'deadline') setClickPower(p => p / 3);
        if (event.id === 'server_crash') setSps(s => s * 2);
        setCurrentEvent(null);
    }, event.duration);
  }

  const spawnBossBug = () => {
    const hp = 100 + score * 0.1; // HP scales with current score
    setBossBug({ hp, maxHp: hp });
    toast({ title: "Bug Trùm Xuất Hiện!", description: "Click liên tục để tiêu diệt nó!", className: 'bg-red-700 text-white border-red-500' });
  }

  const handleBossClick = (e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>) => {
    if (!bossBug) return;
    
    let baseClickValue = clickPower * prestigeBonus;
    if (isPowerUpActive) baseClickValue *= 2;

    playCritSound();
    const newHp = bossBug.hp - baseClickValue;
    addFloatingNumber(baseClickValue, e.clientX, e.clientY, true);

    if (newHp <= 0) {
        const reward = bossBug.maxHp * 2;
        setScore(s => s + reward);
        setStats(prev => ({...prev, bugsFixed: prev.bugsFixed + 100, totalScore: prev.totalScore + reward}));
        setBossBug(null);
        playAchievementSound();
        toast({ title: "Đã Diệt Bug Trùm!", description: `Phần thưởng: +${formatNumber(reward)} điểm!`, className: 'bg-green-500 text-white border-green-500'});
    } else {
        setBossBug({ ...bossBug, hp: newHp });
    }
  }


  // --- Render ---

  return (
    <TooltipProvider>
    <div className="container mx-auto py-12 relative overflow-hidden">
      {/* Floating Numbers */}
      <AnimatePresence>
        {floatingNumbers.map(num => (
          <motion.div
            key={num.id}
            initial={{ opacity: 1, y: 0, x: '-50%' }}
            animate={{ opacity: 0, y: -80 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className={cn(
                "fixed text-lg pointer-events-none font-bold z-50",
                num.isCritical ? "text-yellow-400 text-3xl" : "text-primary"
            )}
            style={{ top: num.y, left: num.x }}
          >
            {num.value}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Power-up */}
      <AnimatePresence>
        {powerUpPosition && (
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1, rotate: [0, 10, -10, 0] }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className="fixed z-40" // Use fixed positioning
                style={{ top: powerUpPosition.top, left: powerUpPosition.left }}
            >
                <Button variant="ghost" size="icon" className="h-20 w-20" onClick={activatePowerUp}>
                    <Coffee className="h-16 w-16 text-yellow-600 drop-shadow-lg" />
                </Button>
            </motion.div>
        )}
       </AnimatePresence>

      <div className="text-center mb-8">
        <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl">
          Thợ Săn Bug
        </h1>
        <p className="mt-3 max-w-2xl mx-auto text-lg text-muted-foreground">
          Nhấp vào con bug để sửa nó. Mua nâng cấp, tái sinh và chinh phục các thành tựu!
        </p>
      </div>

      {currentEvent && (
        <motion.div initial={{y: -100}} animate={{y: 0}} className="text-center mb-4 p-2 bg-destructive text-destructive-foreground rounded-lg font-bold">
            {currentEvent.message}
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {/* Left Column: Main Game Area */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="h-full flex flex-col">
            <CardHeader>
                <StatsDisplay score={score} sps={sps} prestigeBonus={prestigeBonus} stats={stats} />
            </CardHeader>
            <CardContent className="flex-grow flex items-center justify-center relative">
                {bossBug ? (
                     <div className="w-full flex flex-col items-center">
                        <div className="w-full mb-2 max-w-md">
                            <p className="text-center font-bold text-red-500">BUG TRÙM</p>
                            <div className="h-4 w-full bg-muted rounded-full">
                                <motion.div 
                                    className="h-full bg-red-600 rounded-full"
                                    initial={{width: '100%'}}
                                    animate={{width: `${(bossBug.hp / bossBug.maxHp) * 100}%`}}
                                />
                            </div>
                        </div>
                        <motion.div 
                            animate={{ x: [0, -5, 5, -5, 5, 0] }}
                            transition={{ duration: 0.3, repeat: Infinity }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <Button 
                                onClick={handleBossClick} 
                                className="h-64 w-64 rounded-full flex-col gap-2 text-2xl bg-red-800 hover:bg-red-900 glow-destructive"
                            >
                                <Bug className="h-24 w-24"/>
                                TẤN CÔNG
                            </Button>
                        </motion.div>
                    </div>
                ) : (
                    <motion.button 
                        onClick={handleBugFixClick}
                        whileTap={{ scale: 0.95 }}
                        className="relative w-full max-w-lg aspect-video rounded-lg overflow-hidden focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                        <Image 
                            src="https://i.pinimg.com/originals/21/11/61/21116158daaeb1459b4ec0758505e1ad.gif"
                            alt="Fixing a bug"
                            fill
                            className="object-cover"
                            unoptimized
                        />
                         <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors" />
                    </motion.button>
                )}
            </CardContent>
             <div className="p-6 flex flex-wrap items-center justify-center gap-4">
                  <Button onClick={() => setIsAchievementsOpen(true)} variant="outline" size="lg">
                    <Award className="mr-2" /> Xem Thành Tựu ({achievements.filter(a => a.unlocked).length}/{achievements.length})
                  </Button>
                  <Tooltip>
                    <TooltipTrigger asChild>
                        <div className="w-full max-w-xs">
                            <Button onClick={handlePrestige} disabled={!isPrestigeReady} size="lg" className="w-full bg-purple-600 hover:bg-purple-700">
                                <History className="mr-2" /> Tái Sinh (+1 Lợi thế)
                            </Button>
                        </div>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Đạt 1,000,000 điểm để tái sinh. <br /> Reset game nhưng nhận +10% sản lượng điểm vĩnh viễn.</p>
                    </TooltipContent>
                </Tooltip>
             </div>
          </Card>
        </div>

        {/* Right Column: Upgrades & Leaderboard */}
        <div className="lg:col-span-1 space-y-6">
            <Tabs defaultValue="upgrades" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="upgrades"><TrendingUp className="mr-2" />Nâng Cấp</TabsTrigger>
                    <TabsTrigger value="leaderboard"><LayoutGrid className="mr-2"/>Xếp Hạng</TabsTrigger>
                </TabsList>
                <TabsContent value="upgrades" className="mt-4 space-y-4">
                     <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-xl"><TrendingUp /> Tự Động (SPS)</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            {spsUpgrades.map(u => <UpgradeCard key={u.id} upgrade={u} score={score} onPurchase={() => purchaseUpgrade(u.id, 'sps')} />)}
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-xl"><Star /> Click</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            {clickUpgrades.map(u => <UpgradeCard key={u.id} upgrade={u} score={score} onPurchase={() => purchaseUpgrade(u.id, 'click')} />)}
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="leaderboard" className="mt-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Bảng Xếp Hạng (Beta)</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-2 text-sm">
                                <li className="flex justify-between p-2 rounded-md bg-muted/50"><span>1. CodeWizard</span> <span className="font-bold text-primary">5.12T</span></li>
                                <li className="flex justify-between p-2 rounded-md bg-muted/50"><span>2. BugSmasher</span> <span className="font-bold text-primary">4.89T</span></li>
                                <li className="flex justify-between p-2 rounded-md bg-yellow-400/20 text-yellow-200"><span>3. You</span> <span className="font-bold">{formatNumber(stats.totalScore)}</span></li>
                                <li className="flex justify-between p-2 rounded-md bg-muted/50"><span>4. ScriptKid</span> <span className="font-bold text-primary">10.5B</span></li>
                                <li className="flex justify-between p-2 rounded-md bg-muted/50"><span>5. PolyMorphic</span> <span className="font-bold text-primary">8.2B</span></li>
                            </ul>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
      </div>

       <AchievementsDialog 
        isOpen={isAchievementsOpen} 
        onClose={() => setIsAchievementsOpen(false)}
        achievements={achievements}
       />
    </div>
    </TooltipProvider>
  );
}
