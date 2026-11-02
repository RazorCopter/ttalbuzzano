'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { ReactLenis, type LenisRef } from 'lenis/react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

interface SmoothScrollProviderProps {
    children: ReactNode;
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
    const lenisRef = useRef<LenisRef>(null);
    const reducedMotion = usePrefersReducedMotion();

    useEffect(() => {
        // Registra ScrollTrigger per garantire sincronizzazione con Lenis
        gsap.registerPlugin(ScrollTrigger);

        const lenis = lenisRef.current?.lenis;
        if (!lenis || reducedMotion) return;

        // Sincronizza l'evento scroll di Lenis con ScrollTrigger
        const handleScroll = () => {
            ScrollTrigger.update();
        };
        lenis.on('scroll', handleScroll);

        // Integrazione nel render loop di GSAP
        const updateTicker = (time: number) => {
            lenis.raf(time * 1000);
        };

        gsap.ticker.add(updateTicker);
        // Disattiva lag smoothing per prevenire salti a 60/120 FPS
        gsap.ticker.lagSmoothing(0);

        return () => {
            lenis.off('scroll', handleScroll);
            gsap.ticker.remove(updateTicker);
            // Pulizia di ScrollTrigger
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, [reducedMotion]);

    if (reducedMotion) {
        return <>{children}</>;
    }

    return (
        <ReactLenis
            root
            ref={lenisRef}
            options={{
                autoRaf: false,
                lerp: 0.1,
                smoothWheel: true,
                syncTouch: false,
            }}
        >
            {children}
        </ReactLenis>
    );
}
