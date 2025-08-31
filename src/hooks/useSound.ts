
'use client';

import { useCallback, useEffect, useState } from 'react';

// This hook preloads and plays sounds to minimize delay.
export const useSound = (soundPath: string, volume: number = 0.5) => {
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Audio is a browser-only API
    if (typeof Audio !== 'undefined') {
      const audioInstance = new Audio(soundPath);
      audioInstance.volume = volume;
      setAudio(audioInstance);
    }
  }, [soundPath, volume]);

  const playSound = useCallback(() => {
    if (audio) {
      audio.currentTime = 0; // Rewind to the start
      audio.play().catch(err => {
         // This can happen if the user hasn't interacted with the page yet.
         // It's a browser security feature. We can safely ignore it.
         console.log(`Could not play sound ${soundPath}: ${err.message}`);
      });
    }
  }, [audio, soundPath]);

  return playSound;
};

    