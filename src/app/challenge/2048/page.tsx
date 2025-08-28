
'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import Image from 'next/image';

const TILE_LEVELS = [
  { level: 2, name: 'JS', color: '#f7e018', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
  { level: 4, name: 'TS', color: '#3178c6', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
  { level: 8, name: 'React', color: '#61dafb', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { level: 16, name: 'Next.js', color: '#ffffff', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
  { level: 32, name: 'Node.js', color: '#68a063', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
  { level: 64, name: 'Firebase', color: '#ffca28', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg' },
  { level: 128, name: 'Genkit', color: '#9333ea', icon: '/genkit.svg' },
  { level: 256, name: 'Unity', color: '#222c37', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unity/unity-original.svg' },
  { level: 512, name: 'Godot', color: '#478cbf', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/godot/godot-original.svg' },
  { level: 1024, name: 'C#', color: '#27ae60', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg' },
  { level: 2048, name: 'Portfolio', color: 'hsl(var(--primary))', icon: '/logo.svg' },
];

const getTileInfo = (value: number) => TILE_LEVELS.find(t => t.level === value) || TILE_LEVELS[0];

const Tile = ({ value }: { value: number }) => {
  const tileInfo = getTileInfo(value);
  const textColor = tileInfo.name === 'Next.js' ? '#000000' : '#FFFFFF';

  return (
    <div
      className="h-full w-full flex items-center justify-center rounded-lg font-bold text-2xl"
      style={{ backgroundColor: tileInfo.color, color: textColor, textShadow: '1px 1px 2px rgba(0,0,0,0.4)' }}
    >
      <Image src={tileInfo.icon} alt={tileInfo.name} width={48} height={48} className="drop-shadow-lg" />
    </div>
  );
};

const GRID_SIZE = 4;

const generateInitialGrid = (): number[][] => {
    let grid: number[][] = Array(GRID_SIZE).fill(0).map(() => Array(GRID_SIZE).fill(0));
    grid = addRandomTile(grid);
    grid = addRandomTile(grid);
    return grid;
};

const getEmptyCells = (grid: number[][]) => {
    const cells: { row: number; col: number }[] = [];
    for (let i = 0; i < GRID_SIZE; i++) {
        for (let j = 0; j < GRID_SIZE; j++) {
            if (grid[i][j] === 0) {
                cells.push({ row: i, col: j });
            }
        }
    }
    return cells;
};

const addRandomTile = (grid: number[][]): number[][] => {
    const emptyCells = getEmptyCells(grid);
    if (emptyCells.length === 0) return grid;

    const { row, col } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    const newGrid = grid.map(r => [...r]);
    newGrid[row][col] = Math.random() < 0.9 ? 2 : 4;
    return newGrid;
};


const isGameOver = (grid: number[][]): boolean => {
    if (getEmptyCells(grid).length > 0) return false;
    for (let i = 0; i < GRID_SIZE; i++) {
        for (let j = 0; j < GRID_SIZE; j++) {
            const current = grid[i][j];
            if (j < GRID_SIZE - 1 && current === grid[i][j + 1]) return false;
            if (i < GRID_SIZE - 1 && current === grid[i + 1][j]) return false;
        }
    }
    return true;
};

export default function Game2048Page() {
    const [grid, setGrid] = useState<number[][]>([]);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [win, setWin] = useState(false);
    const gridRef = useRef<HTMLDivElement>(null);

    const handleDrop = (
        from: { row: number, col: number },
        to: { row: number, col: number }
    ) => {
        if (from.row === to.row && from.col === to.col) return;

        setGrid(currentGrid => {
            const newGrid = currentGrid.map(r => [...r]);
            const fromValue = newGrid[from.row][from.col];
            const toValue = newGrid[to.row][to.col];
    
            if (fromValue === 0) return currentGrid;
    
            let moved = false;
            let scoreToAdd = 0;
    
            if (toValue === 0) { // Move to empty cell
                newGrid[to.row][to.col] = fromValue;
                newGrid[from.row][from.col] = 0;
                moved = true;
            } else if (toValue === fromValue) { // Merge
                const newValue = fromValue * 2;
                newGrid[to.row][to.col] = newValue;
                newGrid[from.row][from.col] = 0;
                scoreToAdd = newValue;
                moved = true;
            }
    
            if (moved) {
                const gridWithNewTile = addRandomTile(newGrid);
                setScore(s => s + scoreToAdd);
    
                if (gridWithNewTile.flat().includes(2048)) {
                    setWin(true);
                } else if (isGameOver(gridWithNewTile)) {
                    setGameOver(true);
                }
                return gridWithNewTile;
            }
            
            return currentGrid; // No move was made
        });
    };
    
    const resetGame = () => {
        setGrid(generateInitialGrid());
        setScore(0);
        setGameOver(false);
        setWin(false);
    };

    useEffect(() => {
        // Initialize grid on client side to avoid hydration mismatch
        setGrid(generateInitialGrid());
    }, []);
    
    return (
        <div className="container mx-auto py-12 flex flex-col items-center">
            <div className="text-center mb-8">
                <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl">
                    2048: Dev Edition
                </h1>
                <p className="mt-3 max-w-2xl mx-auto text-lg text-muted-foreground">
                    Kéo và thả các công nghệ để hợp nhất chúng và đạt được "Portfolio" cuối cùng!
                </p>
            </div>
            
            <Card className="max-w-md w-full">
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Score: <span className="text-primary">{score}</span></CardTitle>
                    <Button onClick={resetGame} variant="outline" size="icon">
                        <RotateCw />
                    </Button>
                </CardHeader>
                <CardContent>
                    <div className="relative p-4 bg-secondary rounded-lg" ref={gridRef}>
                       <AnimatePresence>
                        {(gameOver || win) && (
                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="absolute inset-0 bg-background/80 z-20 flex items-center justify-center rounded-lg"
                            >
                                <Dialog open onOpenChange={resetGame}>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>{win ? "You Win!" : "Game Over"}</DialogTitle>
                                            <DialogDescription>
                                                {win ? `Chúc mừng! Bạn đã tạo ra được Portfolio Quest! Điểm của bạn là ${score}.` : `Rất tiếc! Điểm của bạn là ${score}.`}
                                            </DialogDescription>
                                        </DialogHeader>
                                        <DialogFooter>
                                            <Button onClick={resetGame}>Chơi Lại</Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                            </motion.div>
                        )}
                        </AnimatePresence>
                        <div className="grid grid-cols-4 gap-4 aspect-square">
                            {grid.length > 0 && grid.map((row, i) =>
                                row.map((_, j) => (
                                    <div key={`${i}-${j}`} className="h-full w-full rounded-lg bg-muted/50"></div>
                                ))
                            )}
                        </div>
                        <AnimatePresence>
                         {grid.length > 0 && grid.map((row, i) =>
                            row.map((cellValue, j) => {
                                if (cellValue === 0) return null;
                                return (
                                    <motion.div
                                        key={`${i}-${j}-${cellValue}`}
                                        layoutId={`${i}-${j}-${cellValue}`}
                                        className="absolute p-2 z-10"
                                        style={{ 
                                            width: '25%', 
                                            height: '25%',
                                            top: `${i * 25}%`,
                                            left: `${j * 25}%`
                                        }}
                                        drag
                                        dragConstraints={gridRef}
                                        dragElastic={0.2}
                                        onDragEnd={(_, info) => {
                                            if (!gridRef.current) return;
                                            const gridRect = gridRef.current.getBoundingClientRect();
                                            const cellWidth = gridRect.width / GRID_SIZE;
                                            const cellHeight = gridRect.height / GRID_SIZE;

                                            const dropCol = Math.min(GRID_SIZE - 1, Math.max(0, Math.floor((info.point.x - gridRect.left) / cellWidth)));
                                            const dropRow = Math.min(GRID_SIZE - 1, Math.max(0, Math.floor((info.point.y - gridRect.top) / cellHeight)));

                                            if(dropRow >= 0 && dropRow < GRID_SIZE && dropCol >=0 && dropCol < GRID_SIZE) {
                                                handleDrop({ row: i, col: j }, { row: dropRow, col: dropCol });
                                            }
                                        }}
                                        initial={{ scale: 0, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        exit={{ scale: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: "backOut" }}
                                    >
                                        <Tile value={cellValue} />
                                    </motion.div>
                                );
                            })
                         )}
                        </AnimatePresence>
                    </div>
                </CardContent>
            </Card>

            <div className="mt-8 text-center text-muted-foreground">
                <p className="font-bold mb-2">Cách chơi:</p>
                <p>Kéo một ô và thả nó vào một ô khác.</p>
                <p>Nếu hai ô có cùng công nghệ, chúng sẽ hợp nhất!</p>
            </div>
        </div>
    );
}
