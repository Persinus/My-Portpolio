
'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, ArrowUp, ArrowDown, RotateCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
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
  if (value === 0) return <div className="h-24 w-24 rounded-lg bg-muted/50"></div>;
  
  const tileInfo = getTileInfo(value);
  const textColor = tileInfo.name === 'Next.js' ? '#000000' : '#FFFFFF';

  return (
    <div
      className="h-24 w-24 flex items-center justify-center rounded-lg font-bold text-2xl"
      style={{ backgroundColor: tileInfo.color, color: textColor, textShadow: '1px 1px 2px rgba(0,0,0,0.4)' }}
    >
      <Image src={tileInfo.icon} alt={tileInfo.name} width={48} height={48} className="drop-shadow-lg" />
    </div>
  );
};

const GRID_SIZE = 4;

const generateInitialGrid = (): (number | null)[][] => {
    let grid: (number | null)[][] = Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(null));
    grid = addRandomTile(grid);
    grid = addRandomTile(grid);
    return grid;
};

const getEmptyCells = (grid: (number | null)[][]) => {
    const cells: { row: number; col: number }[] = [];
    for (let i = 0; i < GRID_SIZE; i++) {
        for (let j = 0; j < GRID_SIZE; j++) {
            if (grid[i][j] === null) {
                cells.push({ row: i, col: j });
            }
        }
    }
    return cells;
};

const addRandomTile = (grid: (number | null)[][]): (number | null)[][] => {
    const emptyCells = getEmptyCells(grid);
    if (emptyCells.length === 0) return grid;

    const { row, col } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    const newGrid = grid.map(r => [...r]);
    newGrid[row][col] = Math.random() < 0.9 ? 2 : 4;
    return newGrid;
};


const move = (grid: (number | null)[][], direction: 'up' | 'down' | 'left' | 'right') => {
    let newGrid = JSON.parse(JSON.stringify(grid));
    let scoreToAdd = 0;
    let moved = false;

    const rotate = (matrix: (number|null)[][]) => {
        const n = matrix.length;
        const newMatrix = Array(n).fill(null).map(() => Array(n).fill(null));
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                newMatrix[i][j] = matrix[n - j - 1][i];
            }
        }
        return newMatrix;
    };
    
    const slideAndMerge = (row: (number|null)[]) => {
        const newRow = row.filter(cell => cell !== null);
        for (let i = 0; i < newRow.length - 1; i++) {
            if (newRow[i] === newRow[i + 1]) {
                const newValue = (newRow[i] ?? 0) * 2;
                newRow[i] = newValue;
                scoreToAdd += newValue;
                newRow.splice(i + 1, 1);
            }
        }
        while (newRow.length < GRID_SIZE) {
            newRow.push(null);
        }
        return newRow;
    }

    const rotations = {
        left: 0,
        up: 1,
        right: 2,
        down: 3
    };

    const numRotations = rotations[direction];

    for(let i=0; i < numRotations; i++) {
        newGrid = rotate(newGrid);
    }
    
    for (let i = 0; i < GRID_SIZE; i++) {
        const originalRow = [...newGrid[i]];
        newGrid[i] = slideAndMerge(newGrid[i]);
        if (JSON.stringify(originalRow) !== JSON.stringify(newGrid[i])) {
            moved = true;
        }
    }

    for(let i=0; i < (4 - numRotations) % 4; i++) {
        newGrid = rotate(newGrid);
    }
    
    return { newGrid, scoreToAdd, moved };
};

const isGameOver = (grid: (number | null)[][]) => {
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
    const [grid, setGrid] = useState<(number | null)[][]>(generateInitialGrid());
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [win, setWin] = useState(false);

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (gameOver || win) return;

        let direction: 'up' | 'down' | 'left' | 'right' | null = null;
        switch (e.key) {
            case 'ArrowUp': direction = 'up'; break;
            case 'ArrowDown': direction = 'down'; break;
            case 'ArrowLeft': direction = 'left'; break;
            case 'ArrowRight': direction = 'right'; break;
        }

        if (direction) {
            e.preventDefault();
            const { newGrid, scoreToAdd, moved } = move(grid, direction);

            if (moved) {
                const gridWithNewTile = addRandomTile(newGrid);
                setGrid(gridWithNewTile);
                setScore(s => s + scoreToAdd);

                if (gridWithNewTile.some(row => row.includes(2048))) {
                    setWin(true);
                } else if (isGameOver(gridWithNewTile)) {
                    setGameOver(true);
                }
            }
        }
    }, [grid, gameOver, win]);

    const resetGame = () => {
        setGrid(generateInitialGrid());
        setScore(0);
        setGameOver(false);
        setWin(false);
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);

    return (
        <div className="container mx-auto py-12 flex flex-col items-center">
            <div className="text-center mb-8">
                <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl">
                    2048: Dev Edition
                </h1>
                <p className="mt-3 max-w-2xl mx-auto text-lg text-muted-foreground">
                    Ghép các công nghệ để đạt được "Portfolio" cuối cùng!
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
                    <div className="relative p-4 bg-secondary rounded-lg">
                       <AnimatePresence>
                        {(gameOver || win) && (
                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="absolute inset-0 bg-background/80 z-10 flex items-center justify-center rounded-lg"
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
                        <div className="grid grid-cols-4 gap-4">
                            {grid.map((row, i) =>
                                row.map((cell, j) => (
                                    <AnimatePresence key={`${i}-${j}`}>
                                        <motion.div
                                            initial={{ scale: 0.5, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <Tile value={cell ?? 0} />
                                        </motion.div>
                                    ))
                                )
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="mt-8 text-center text-muted-foreground">
                <p className="font-bold mb-2">Cách chơi:</p>
                <p>Sử dụng các phím mũi tên để di chuyển các ô.</p>
                <p>Khi hai ô có cùng công nghệ chạm nhau, chúng sẽ hợp nhất!</p>
                <div className="flex justify-center gap-2 mt-4 md:hidden">
                    <Button variant="outline" size="icon" onClick={() => handleKeyDown({key: 'ArrowUp', preventDefault: ()=>{}} as KeyboardEvent)}><ArrowUp /></Button>
                    <Button variant="outline" size="icon" onClick={() => handleKeyDown({key: 'ArrowDown', preventDefault: ()=>{}} as KeyboardEvent)}><ArrowDown /></Button>
                    <Button variant="outline" size="icon" onClick={() => handleKeyDown({key: 'ArrowLeft', preventDefault: ()=>{}} as KeyboardEvent)}><ArrowLeft /></Button>
                    <Button variant="outline" size="icon" onClick={() => handleKeyDown({key: 'ArrowRight', preventDefault: ()=>{}} as KeyboardEvent)}><ArrowRight /></Button>
                </div>
            </div>
        </div>
    );
}
