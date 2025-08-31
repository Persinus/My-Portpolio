
'use client';

import { Suspense, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

// Dynamically import the 3D scene component with SSR turned off
const CharacterMovementScene = dynamic(
    () => import('@/components/CharacterMovementScene'),
    { 
        ssr: false,
        loading: () => (
            <div className="w-full h-full flex items-center justify-center bg-muted">
                <Skeleton className="w-full h-full" />
            </div>
        )
    }
);


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
                <Suspense fallback={<Skeleton className="w-full h-full" />}>
                   <CharacterMovementScene />
                </Suspense>
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

