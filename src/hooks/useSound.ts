'use client';

import { useCallback, useMemo } from 'react';

// This hook preloads and plays sounds to minimize delay.
export const useSound = (soundPath: string, volume: number = 0.5) => {
  const audio = useMemo(() => {
    if (typeof Audio !== 'undefined') {
      const a = new Audio(soundPath);
      a.volume = volume;
      return a;
    }
    return undefined;
  }, [soundPath, volume]);

  const playSound = useCallback(() => {
    if (audio) {
      audio.currentTime = 0; // Rewind to the start
      audio.play().catch(err => {
        // Autoplay is often blocked by browsers, log error for debugging.
        console.error(`Could not play sound: ${err.message}`);
      });
    }
  }, [audio]);

  return playSound;
};
