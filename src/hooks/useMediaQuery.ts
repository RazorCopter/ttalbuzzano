'use client';

import { useState, useEffect } from 'react';

/**
 * Hook generico per la valutazione reattiva di media query CSS.
 */
export function useMediaQuery(query: string): boolean {
    const [matches, setMatches] = useState<boolean>(false);

    useEffect(() => {
        if (typeof window === 'undefined' || !window.matchMedia) {
            return;
        }

        const mediaQueryList = window.matchMedia(query);
        setMatches(mediaQueryList.matches);

        const listener = (event: MediaQueryListEvent) => {
            setMatches(event.matches);
        };

        if (mediaQueryList.addEventListener) {
            mediaQueryList.addEventListener('change', listener);
        } else {
            mediaQueryList.addListener(listener);
        }

        return () => {
            if (mediaQueryList.removeEventListener) {
                mediaQueryList.removeEventListener('change', listener);
            } else {
                mediaQueryList.removeListener(listener);
            }
        };
    }, [query]);

    return matches;
}
