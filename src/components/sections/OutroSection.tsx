'use client';

import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export function OutroSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const outlineTextRef = useRef<HTMLHeadingElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            if (!sectionRef.current || !outlineTextRef.current) return;

            // Fill outline text on scroll
            gsap.fromTo(
                outlineTextRef.current,
                {
                    backgroundSize: '0% 100%',
                },
                {
                    backgroundSize: '100% 100%',
                    ease: 'none',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 70%',
                        end: 'center 45%',
                        scrub: true,
                    },
                }
            );

            gsap.from(containerRef.current?.children || [], {
                y: 40,
                opacity: 0,
                stagger: 0.15,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 60%',
                },
            });
        },
        { scope: sectionRef }
    );

    const handleScrollToTop = () => {
        if (typeof window !== 'undefined') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <section
            id="outro"
            ref={sectionRef}
            aria-label="Epilogo e Chiusura Narrativa"
            className="relative flex min-h-screen flex-col items-center justify-center border-t border-white/5 bg-ink py-24 sm:py-32 px-4 sm:px-6 lg:px-8 text-center overflow-hidden"
        >
            {/* Background glowing sphere decoration */}
            <div
                className="pointer-events-none absolute -bottom-32 left-1/2 -translate-x-1/2 h-96 w-96 rounded-full bg-neon-red/15 blur-[120px]"
                aria-hidden="true"
            />

            <div ref={containerRef} className="container-x max-w-5xl mx-auto relative z-10 flex flex-col items-center">
                <Badge variant="neon-red" pulse size="sm" className="mb-6">
                    [ 09 // EPILOGO // ULTIMO RIMBALZO ]
                </Badge>

                {/* Massive Animated Text Reveal (Text fill scrub) */}
                <h2
                    ref={outlineTextRef}
                    className="text-mega font-display uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-neon-red via-white to-speed-cyan bg-no-repeat transition-all select-none [text-stroke:1px_rgba(255,255,255,0.25)]"
                    style={{ backgroundSize: '0% 100%' }}
                >
                    FEEL THE IMPACT
                </h2>

                <p className="mt-8 max-w-2xl text-base sm:text-lg lg:text-xl text-paper-muted leading-relaxed">
                    Il tennistavolo agonistico non è una semplice disciplina sportiva:
                    è la dimostrazione vivente di come mente e corpo umano possano superare la barriera della consapevolezza razionale.
                </p>

                {/* Summary Metrics Chips */}
                <div className="mt-8 flex flex-wrap justify-center gap-4 text-xs font-mono text-paper-muted">
                    <span className="px-3 py-1 rounded bg-white/5 border border-white/10">
                        VELOCITÀ RECORD: <strong className="text-white">112 KM/H</strong>
                    </span>
                    <span className="px-3 py-1 rounded bg-white/5 border border-white/10">
                        ROTAZIONE DIRETTA: <strong className="text-white">9.000 RPM</strong>
                    </span>
                    <span className="px-3 py-1 rounded bg-white/5 border border-white/10">
                        TEMPO DI RISPOSTA: <strong className="text-white">{'< 180 MS'}</strong>
                    </span>
                </div>

                {/* Back to top CTA */}
                <div className="mt-12 flex flex-col sm:flex-row items-center gap-4">
                    <Button
                        variant="primary"
                        size="lg"
                        onClick={handleScrollToTop}
                        className="shadow-[0_0_30px_rgba(255,0,60,0.5)]"
                    >
                        TORNA ALL'INIZIO ↑
                    </Button>
                    <a
                        href="#hero"
                        className="font-mono text-xs uppercase tracking-widest text-paper-muted hover:text-speed-cyan transition-colors py-2 px-4"
                    >
                        RIVEDI INTRODUZIONE
                    </a>
                </div>

                <div className="mt-16 text-center">
                    <p className="font-mono text-[11px] uppercase tracking-widest text-paper-muted/60">
                        TABLE TENNIS // BEYOND THE SPEED — ESPERIENZA DIGITALE INTERATTIVA
                    </p>
                </div>
            </div>
        </section>
    );
}

export default OutroSection;
