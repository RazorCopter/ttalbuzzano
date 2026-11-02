'use client';

import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';

export function ScrollProgress() {
    const progressBarRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            if (!progressBarRef.current) return;

            gsap.to(progressBarRef.current, {
                scaleX: 1,
                ease: 'none',
                scrollTrigger: {
                    trigger: document.documentElement,
                    start: 'top top',
                    end: 'bottom bottom',
                    scrub: 0.2,
                },
            });
        },
        { scope: progressBarRef },
    );

    return (
        <div
            role="progressbar"
            aria-label="Progresso scorrimento pagina"
            className="fixed top-0 left-0 right-0 z-50 h-[3px] bg-transparent pointer-events-none"
        >
            <div
                ref={progressBarRef}
                className="h-full w-full origin-left scale-x-0 bg-gradient-to-r from-neon-red via-signal to-speed-cyan shadow-[0_0_8px_rgba(0,240,255,0.7)]"
            />
        </div>
    );
}
