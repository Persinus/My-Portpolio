
'use client';

import { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Box, OrbitControls, Plane } from '@react-three/drei';
import type { Mesh } from 'three';

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

    useFrame(() => {
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

export default function CharacterMovementScene() {
    return (
        <Canvas camera={{ position: [0, 8, 10] }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <Plane args={[20, 20]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
                <meshStandardMaterial color="hsl(var(--secondary))" />
            </Plane>
            <Player />
            <OrbitControls enableZoom={true} enablePan={true} />
        </Canvas>
    );
}
