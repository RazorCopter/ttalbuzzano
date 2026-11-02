'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { gsap, useGSAP } from '@/lib/gsap';
import { ASSETS } from '@/lib/assets';
import { Badge } from '@/components/ui/Badge';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

const ARENA_STANDARDS = [
    {
        title: 'Illuminazione ITTF',
        value: '1.400 Lux',
        detail: 'Sorgenti LED antiriflesso polarizzate a luce diffusa verticale',
    },
    {
        title: 'Dimensioni Court',
        value: '14 × 7 Metri',
        detail: 'Altezza minima del soffitto pari a 5 metri senza ostacoli aerei',
    },
    {
        title: 'Pavimentazione',
        value: 'Taraflex 7.0 mm',
        detail: 'Assorbimento dinamico d\'urto superiore al 25% con grip laterale',
    },
    {
        title: 'Controllo Flussi Aria',
        value: '< 0.15 m/s',
        detail: 'Microclima a 18-22°C a ventilazione laminare senza correnti',
    },
];

export function ArenaSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const imageContainerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const prefersReducedMotion = usePrefersReducedMotion();

    useGSAP(
        () => {
            if (prefersReducedMotion || !sectionRef.current || !imageContainerRef.current) return;

            // Clip-path and zoom reveal on scroll
            gsap.fromTo(
                imageContainerRef.current,
                {
                    clipPath: 'inset(8% round 24px)',
                    scale: 1.08,
                },
                {
                    clipPath: 'inset(0% round 0px)',
                    scale: 1.0,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top bottom',
                        end: 'center center',
                        scrub: true,
                    },
                }
            );

            // Parallax content offset
            gsap.from(contentRef.current, {
                y: 60,
                opacity: 0,
                duration: 1.2,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 60%',
                },
            });
        },
        { scope: sectionRef, dependencies: [prefersReducedMotion] }
    );

    return (
        <section
            id="arena"
            ref={sectionRef}
            aria-label="L'Arena di Gara e Specifiche ITTF"
            className="relative flex min-h-screen flex-col justify-center overflow-hidden border-t border-white/5 bg-ink py-24 sm:py-32"
        >
            {/* Cinematic Fullscreen Background Image with Parallax / Reveal */}
            <div
                ref={imageContainerRef}
                className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
                aria-hidden="true"
            >
                <Image
                    src={ASSETS.arena.wide}
                    alt=""
                    fill
                    sizes="100vw"
                    className="object-cover object-center filter brightness-50 contrast-125"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/90" />
            </div>

            <div
                ref={contentRef}
                className="container-x max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
            >
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <Badge variant="speed-cyan" size="sm" className="mb-4">
                        [ 08 // THE OLYMPIC ARENA ]
                    </Badge>
                    <h2 className="text-giant font-display uppercase tracking-tight text-paper">
                        THE BATTLE<span className="text-table">GROUND</span>
                    </h2>
                    <p className="mt-4 text-base sm:text-lg text-paper-muted">
                        Un colosseo ad atmosfera pressurizzata: 10.000 spettatori trattenuti nel silenzio prima del servizio,
                        inondati da 1.400 lux di luce bianca su un rettangolo di precisione assoluta.
                    </p>
                </div>

                {/* Technical Regulatory Standards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {ARENA_STANDARDS.map((std, idx) => (
                        <div
                            key={idx}
                            className="rounded-xl border border-white/10 bg-black/60 p-6 backdrop-blur-md hover:border-speed-cyan/40 transition-all duration-300 group"
                        >
                            <span className="font-mono text-xs text-speed-cyan uppercase tracking-wider block mb-2">
                                0{idx + 1} // STANDARD ITTF
                            </span>
                            <div className="font-mono text-3xl font-black text-paper group-hover:text-speed-cyan transition-colors">
                                {std.value}
                            </div>
                            <h3 className="text-base font-bold text-paper mt-2 mb-1">{std.title}</h3>
                            <p className="text-xs text-paper-muted leading-relaxed">{std.detail}</p>
                        </div>
                    ))}
                </div>

                {/* Atmospheric Arena Insights */}
                <div className="mt-12 rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8 backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-table/20 border border-table/30 text-table text-xl font-bold">
                            IT
                        </div>
                        <div>
                            <h4 className="text-lg font-bold uppercase tracking-tight text-paper">
                                Isolamento Acustico e Calibrazione Spazio-Tempo
                            </h4>
                            <p className="text-xs sm:text-sm text-paper-muted">
                                Il tavolo isolato riduce il riverbero dell'impatto sonoro a frequenze secche,
                                consentendo ai contendenti di 'udire' la rotazione impartita dalla gomma avversaria.
                            </p>
                        </div>
                    </div>
                    <div className="shrink-0 font-mono text-xs font-semibold px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-paper">
                        REGOLAMENTO UFFICIALE // ITTF CAP. 3
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ArenaSection;
