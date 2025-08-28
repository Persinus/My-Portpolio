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
      // Temporarily disabled to prevent console errors with empty audio files.
      // To re-enable, add valid audio files to /public/audio and uncomment the line below.
      // audio.play().catch(err => {
      //   console.error(`Could not play sound: ${err.message}`);
      // });
    }
  }, [audio]);

  return playSound;
};
