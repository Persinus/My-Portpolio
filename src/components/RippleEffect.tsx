'use client';
import Ripples from 'react-ripples';

export default function RippleEffect({ children }: { children: React.ReactNode }) {
    return (
        <div className='relative rounded-lg overflow-hidden h-full w-full'>
            <Ripples during={1200} className='h-full w-full block'>
                {children}
            </Ripples>
        </div>
    )
}
