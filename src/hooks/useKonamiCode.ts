'use client';

import { useEffect, useState, useCallback } from 'react';

const KONAMI_CODE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
];

export const useKonamiCode = (callback: () => void) => {
  const [keys, setKeys] = useState<string[]>([]);

  const keydownHandler = useCallback(
    (e: KeyboardEvent) => {
      setKeys((currentKeys) => {
        const newKeys = [...currentKeys, e.key];
        // Keep the array at the same length as the konami code
        if (newKeys.length > KONAMI_CODE.length) {
          return newKeys.slice(1);
        }
        return newKeys;
      });
    },
    []
  );

  useEffect(() => {
    if (keys.join(',') === KONAMI_CODE.join(',')) {
      callback();
      setKeys([]); // Reset keys after successful activation
    }
  }, [keys, callback]);

  useEffect(() => {
    window.addEventListener('keydown', keydownHandler);
    return () => {
      window.removeEventListener('keydown', keydownHandler);
    };
  }, [keydownHandler]);
};