'use client';

import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import { statsData } from '@/data/stats';
import { StatCounter } from '@/components/ui/StatCounter';
import { Badge } from '@/components/ui/Badge';
import { Marquee } from '@/components/ui/Marquee';

const COMPARISON_DATA = [
    {
        sport: 'Tennistavolo (Smash)',
        speed: '112-120 km/h',
        distance: '2.74 m',
        reactionTime: 0.18,
        reactionLabel: '0.18s',
        highlight: true,
        barPercentage: '95%',
        colorClass: 'bg-neon-red',
    },
    {
        sport: 'Badminton (Smash)',
        speed: '493 km/h',
        distance: '13.4 m',
        reactionTime: 0.25,
        reactionLabel: '0.25s',
        highlight: false,
        barPercentage: '75%',
        colorClass: 'bg-speed-cyan',
    },
    {
        sport: 'Formula 1 (Curva Rapida)',
        speed: '340 km/h',
        distance: '80 m',
        reactionTime: 0.32,
        reactionLabel: '0.32s',
        highlight: false,
        barPercentage: '55%',
        colorClass: 'bg-signal',
    },
    {
        sport: 'Tennis (Servizio ATP)',
        speed: '240 km/h',
        distance: '23.77 m',
        reactionTime: 0.40,
        reactionLabel: '0.40s',
        highlight: false,
        barPercentage: '45%',
        colorClass: 'bg-paper-muted',
    },
    {
        sport: 'Baseball (Fastball MLB)',
        speed: '165 km/h',
        distance: '18.4 m',
        reactionTime: 0.38,
        reactionLabel: '0.38s',
        highlight: false,
        barPercentage: '48%',
        colorClass: 'bg-paper-muted',
    },
];

export function SpeedSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const barsRef = useRef<HTMLDivElement>(null);
    const speedLinesRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            if (!sectionRef.current) return;

            // Animate comparative reaction bars
            const progressBars = barsRef.current?.querySelectorAll('.reaction-progress-bar');
            if (progressBars && progressBars.length > 0) {
                gsap.fromTo(
                    progressBars,
                    { scaleX: 0, transformOrigin: 'left' },
                    {
                        scaleX: 1,
                        duration: 1.2,
                        stagger: 0.15,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: barsRef.current,
                            start: 'top 80%',
                        },
                    }
                );
            }

            // Speed lines subtle parallax
            gsap.to(speedLinesRef.current, {
                yPercent: -20,
                ease: 'none',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true,
                },
            });
        },
        { scope: sectionRef }
    );

    return (
        <section
            id="speed"
            ref={sectionRef}
            aria-label="Velocità e Accelerazione"
            className="relative flex min-h-screen flex-col justify-center border-t border-white/5 bg-ink py-24 sm:py-32 overflow-hidden"
        >
            {/* Speed lines in background */}
            <div
                ref={speedLinesRef}
                className="pointer-events-none absolute inset-0 opacity-15"
                aria-hidden="true"
            >
                <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_40px,rgba(0,240,255,0.06)_40px,rgba(0,240,255,0.06)_42px)]" />
            </div>

            {/* Marquee Ticker Banner Top */}
            <div className="border-y border-white/10 bg-white/[0.015] py-3 mb-16">
                <Marquee speed={20} pauseOnHover={false}>
                    <div className="flex items-center gap-12 font-mono text-sm sm:text-base font-bold tracking-widest uppercase text-paper-muted">
                        <span className="text-neon-red">⚡ 112 KM/H RECORD</span>
                        <span className="text-white/20">///</span>
                        <span className="text-speed-cyan">🌪️ 9.000 RPM TOP SPIN</span>
                        <span className="text-white/20">///</span>
                        <span className="text-court-green">⏱️ 0.18s REACTION WINDOW</span>
                        <span className="text-white/20">///</span>
                        <span className="text-signal">40+ ABS SEAMLESS</span>
                        <span className="text-white/20">///</span>
                    </div>
                </Marquee>
            </div>

            <div className="container-x max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <Badge variant="neon-red" pulse size="sm" className="mb-4">
                        [ 03 // VELOCITÀ & COMPARATIVA ]
                    </Badge>
                    <h2 className="text-giant font-display uppercase tracking-tight text-paper">
                        VELOCITÀ <span className="text-neon-red">RELATIVA</span>
                    </h2>
                    <p className="mt-4 text-base sm:text-lg text-paper-muted">
                        Non conta soltanto la velocità assoluta: conta la distanza di ingaggio.
                        Nel tennistavolo, il tempo a disposizione per reagire è il più breve di qualsiasi disciplina sportiva al mondo.
                    </p>
                </div>

                {/* Primary Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-20 p-6 sm:p-8 rounded-xl border border-white/10 bg-white/[0.02] backdrop-blur-md">
                    {statsData.map((stat, idx) => (
                        <div key={idx} className="text-center sm:text-left">
                            <StatCounter
                                value={stat.value}
                                suffix={` ${stat.suffix}`}
                                decimals={stat.value % 1 !== 0 ? 2 : 0}
                                label={stat.label}
                                colorVariant={
                                    idx === 0 ? 'red' : idx === 1 ? 'cyan' : idx === 2 ? 'orange' : 'white'
                                }
                            />
                        </div>
                    ))}
                </div>

                {/* Comparative Sports Telemetry Bar Chart */}
                <div className="rounded-xl border border-white/10 bg-black/40 p-6 sm:p-10 backdrop-blur-md">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-white/10 gap-4">
                        <div>
                            <span className="font-mono text-xs uppercase tracking-widest text-speed-cyan">
                                // BENCHMARK ATLETICO INTERDISCIPLINARE
                            </span>
                            <h3 className="text-2xl font-bold uppercase tracking-tight text-paper mt-1">
                                Finestra di Reazione Utile all'Atleta (Reaction Window)
                            </h3>
                            <p className="text-xs text-paper-muted mt-1">
                                Minore è il tempo disponibile, più estremo è il carico di stress sul sistema nervoso centrale.
                            </p>
                        </div>
                        <div className="font-mono text-xs font-bold px-3 py-1.5 rounded bg-neon-red/10 border border-neon-red/30 text-neon-red self-start sm:self-auto">
                            TENNISTAVOLO = 1° POSTO AL MONDO
                        </div>
                    </div>

                    <div ref={barsRef} className="space-y-6">
                        {COMPARISON_DATA.map((item, index) => (
                            <div key={index} className="space-y-2">
                                <div className="flex flex-wrap items-center justify-between gap-2 text-xs sm:text-sm">
                                    <div className="flex items-center gap-2">
                                        <span className={`font-bold ${item.highlight ? 'text-neon-red' : 'text-paper'}`}>
                                            {item.sport}
                                        </span>
                                        <span className="font-mono text-paper-muted">
                                            ({item.speed} @ {item.distance})
                                        </span>
                                    </div>
                                    <div className="font-mono font-bold text-paper">
                                        Tempo Reazione: <span className={item.highlight ? 'text-neon-red font-black' : 'text-speed-cyan'}>{item.reactionLabel}</span>
                                    </div>
                                </div>
                                <div className="h-4 w-full bg-white/5 rounded-full overflow-hidden p-0.5 border border-white/10">
                                    <div
                                        className={`reaction-progress-bar h-full rounded-full ${item.colorClass} ${item.highlight ? 'shadow-[0_0_15px_rgba(255,0,60,0.8)]' : ''}`}
                                        style={{ width: item.barPercentage }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default SpeedSection;
