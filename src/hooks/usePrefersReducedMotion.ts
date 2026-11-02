'use client';

import { useState, useEffect } from 'react';

/**
 * Hook per rilevare la preferenza utente prefers-reduced-motion.
 * Restituisce true se l'utente richiede movimento ridotto.
 */
export function usePrefersReducedMotion(): boolean {
    const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);

    useEffect(() => {
        if (typeof window === 'undefined' || !window.matchMedia) {
            return;
        }

        const mediaQueryList = window.matchMedia('(prefers-reduced-motion: reduce)');
        setPrefersReducedMotion(mediaQueryList.matches);

        const listener = (event: MediaQueryListEvent) => {
            setPrefersReducedMotion(event.matches);
        };

        if (mediaQueryList.addEventListener) {
            mediaQueryList.addEventListener('change', listener);
        } else {
            // Fallback per browser datati
            mediaQueryList.addListener(listener);
        }

        return () => {
            if (mediaQueryList.removeEventListener) {
                mediaQueryList.removeEventListener('change', listener);
            } else {
                mediaQueryList.removeListener(listener);
            }
        };
    }, []);

    return prefersReducedMotion;
}
