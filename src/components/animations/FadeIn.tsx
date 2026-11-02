'use client';

import { useRef, type ReactNode } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';

interface FadeInProps {
    children: ReactNode;
    className?: string;
    delay?: number;
    yOffset?: number;
}

export function FadeIn({
    children,
    className,
    delay = 0,
    yOffset = 40,
}: FadeInProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const mm = gsap.matchMedia();

            mm.add('(prefers-reduced-motion: no-preference)', () => {
                gsap.from(containerRef.current, {
                    autoAlpha: 0,
                    y: yOffset,
                    duration: 0.8,
                    delay,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: 'top 85%',
                        toggleActions: 'play none none reverse',
                    },
                });
            });

            return () => mm.revert();
        },
        { scope: containerRef },
    );

    return (
        <div ref={containerRef} className={className}>
            {children}
        </div>
    );
}
