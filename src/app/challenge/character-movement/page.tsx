
'use client';

import { Suspense, useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Box, OrbitControls, Plane } from '@react-three/drei';
import type { Mesh } from 'three';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';

// Custom hook to handle keyboard inputs
const useKeyboardControls = () => {
    const keys = useRef({
        ArrowUp: false,
        ArrowDown: false,
        ArrowLeft: false,
        ArrowRight: false,
        w: false,
        a: false,
        s: false,
        d: false,
    });

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (Object.prototype.hasOwnProperty.call(keys.current, e.key)) {
                (keys.current as any)[e.key] = true;
            }
        };
        const handleKeyUp = (e: KeyboardEvent) => {
            if (Object.prototype.hasOwnProperty.call(keys.current, e.key)) {
                (keys.current as any)[e.key] = false;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    return keys;
};

// Player component
function Player() {
    const playerRef = useRef<Mesh>(null!);
    const keyboard = useKeyboardControls();
    const speed = 0.1;

    useFrame((_, delta) => {
        if (!playerRef.current) return;

        const move = { x: 0, z: 0 };
        if (keyboard.current.ArrowUp || keyboard.current.w) move.z -= speed;
        if (keyboard.current.ArrowDown || keyboard.current.s) move.z += speed;
        if (keyboard.current.ArrowLeft || keyboard.current.a) move.x -= speed;
        if (keyboard.current.ArrowRight || keyboard.current.d) move.x += speed;

        playerRef.current.position.x += move.x;
        playerRef.current.position.z += move.z;
    });

    return (
        <Box ref={playerRef} args={[1, 1, 1]} position={[0, 0.5, 0]}>
            <meshStandardMaterial color="hsl(var(--primary))" />
        </Box>
    );
}

// Main page component
export default function CharacterMovementPage() {
    const { toast } = useToast();

    useEffect(() => {
        toast({
            title: 'Controls',
            description: 'Use Arrow Keys or WASD to move the character.',
            duration: 5000,
        });
    }, [toast]);

    return (
        <div className="container mx-auto py-12 flex flex-col items-center">
             <div className="text-center mb-8">
                <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl">
                    3D Character Movement
                </h1>
                <p className="mt-3 max-w-2xl mx-auto text-lg text-muted-foreground">
                    A simple demo of character controls in a 3D space using Three.js.
                </p>
            </div>
            <div className="w-full max-w-4xl h-[60vh] rounded-lg overflow-hidden border-2 border-primary glow-primary">
                <Canvas camera={{ position: [0, 8, 10] }}>
                    <Suspense fallback={null}>
                        <ambientLight intensity={0.5} />
                        <directionalLight position={[10, 10, 5]} intensity={1} />
                        <Plane args={[20, 20]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
                            <meshStandardMaterial color="hsl(var(--secondary))" />
                        </Plane>
                        <Player />
                        <OrbitControls enableZoom={true} enablePan={true} />
                    </Suspense>
                </Canvas>
            </div>
             <div className="mt-8 text-center text-muted-foreground">
                <p className="font-bold mb-4">Controls:</p>
                <div className="flex flex-col items-center gap-2">
                    <Button variant="outline" size="icon"><ArrowUp /></Button>
                    <div className="flex gap-2">
                        <Button variant="outline" size="icon"><ArrowLeft /></Button>
                        <Button variant="outline" size="icon"><ArrowDown /></Button>
                        <Button variant="outline" size="icon"><ArrowRight /></Button>
                    </div>
                    <p className="mt-2">...or use the <span className="font-bold text-primary">WASD</span> keys.</p>
                </div>
            </div>
        </div>
    );
}
