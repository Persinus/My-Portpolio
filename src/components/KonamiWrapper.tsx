'use client';

import { useKonamiCode } from '@/hooks/useKonamiCode';
import type { ReactNode } from 'react';

type KonamiWrapperProps = {
  children: ReactNode;
};

export default function KonamiWrapper({ children }: KonamiWrapperProps) {
  const onKonamiCode = () => {
    document.body.classList.add('barrel-roll');
    setTimeout(() => {
      document.body.classList.remove('barrel-roll');
    }, 1500); // Duration of the animation
  };

  useKonamiCode(onKonamiCode);

  return <>{children}</>;
}