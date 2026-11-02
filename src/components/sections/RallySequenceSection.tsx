'use client';

import { useRef, useState } from 'react';
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap';
import { useImageSequence } from '@/hooks/useImageSequence';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { ASSETS } from '@/lib/assets';
import { Badge } from '@/components/ui/Badge';

const RALLY_FRAME_COUNT = ASSETS.sequences.rally.frameCount;

const SEQUENCE_PHASES = [
    {
        title: 'FASE 1: CARICAMENTO & TORSIONE',
        range: 'Frame 001 - 040',
        telemetry: 'VELOCITÀ RACCHETTA: 65 KM/H | ANGOLO GOMMA: 32°',
        description:
            'Il giocatore abbassa il baricentro e innesca la torsione pelvica. L\'avambraccio si apre creando una leva elastica propedeutica all\'accelerazione angolare.',
    },
    {
        title: 'FASE 2: IMPATTO & CURVATURA MAGNUS',
        range: 'Frame 041 - 080',
        telemetry: 'VELOCITÀ MASSIMA: 118 KM/H | ROTAZIONE: 8.850 RPM',
        description:
            'Micro-frazione di contatto gomma-pallina (1,2 millisecondi). I puntini interni della gomma High-Tension cedono energia potenziale generando rotazione estrema.',
    },
    {
        title: 'FASE 3: RECUPERO & TRAIETTORIA PARABOLICA',
        range: 'Frame 081 - 120',
        telemetry: 'TEMPO DI VOLO RESIDUO: 75 MS | ALTEZZA RETE: 15.25 CM',
        description:
            'L\'effetto Magnus forza la pallina ad abbassarsi bruscamente sfiorando la rete, tuffandosi nell\'angolo cieco del tavolo avversario.',
    },
];

export function RallySequenceSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const pinContainerRef = useRef<HTMLDivElement>(null);
    const prefersReducedMotion = usePrefersReducedMotion();
    const [activePhaseIndex, setActivePhaseIndex] = useState(0);

    const {
        canvasRef,
        renderProgress,
        isLoading,
        loadProgress,
        currentFrame,
    } = useImageSequence({
        frameCount: RALLY_FRAME_COUNT,
        getFrameUrl: ASSETS.sequences.rally.getFramePath,
        autoDrawFirstFrame: true,
    });

    useGSAP(
        () => {
            if (prefersReducedMotion || !sectionRef.current || !pinContainerRef.current) return;

            const mm = gsap.matchMedia();

            mm.add(
                {
                    isDesktop: '(min-width: 768px)',
                    isMobile: '(max-width: 767px)',
                },
                (context) => {
                    const isDesktop = context.conditions?.isDesktop;
                    const scrollDistance = isDesktop ? '+=300%' : '+=180%';

                    const proxy = { progress: 0 };

                    const st = ScrollTrigger.create({
                        trigger: sectionRef.current,
                        start: 'top top',
                        end: scrollDistance,
                        pin: pinContainerRef.current,
                        scrub: 0.4,
                        onUpdate: (self) => {
                            proxy.progress = self.progress;
                            renderProgress(self.progress);

                            // Calculate active narrative phase based on progress
                            if (self.progress < 0.35) {
                                setActivePhaseIndex(0);
                            } else if (self.progress < 0.7) {
                                setActivePhaseIndex(1);
                            } else {
                                setActivePhaseIndex(2);
                            }
                        },
                    });

                    return () => {
                        st.kill();
                    };
                }
            );
        },
        { scope: sectionRef, dependencies: [prefersReducedMotion] }
    );

    // Simulated velocity calculated dynamically from current frame index
    const calculatedVelocity = Math.round(
        currentFrame < 35
            ? 45 + (currentFrame / 35) * 55
            : currentFrame <= 75
                ? 115 - ((currentFrame - 35) / 40) * 20
                : 95 - ((currentFrame - 75) / 45) * 45
    );

    const fallbackPhase = SEQUENCE_PHASES[0] as (typeof SEQUENCE_PHASES)[number];
    const activePhase = SEQUENCE_PHASES[activePhaseIndex] ?? fallbackPhase;

    return (
        <section
            id="rally"
            ref={sectionRef}
            aria-label="Sequenza Rally Interattiva Frame by Frame"
            className="relative w-full bg-ink"
        >
            <h2 className="sr-only">Anatomia balistica di un rally fotogramma per fotogramma</h2>

            <div
                ref={pinContainerRef}
                className="relative h-screen w-full overflow-hidden flex flex-col justify-between"
            >
                {/* Canvas Background Screen */}
                <div className="absolute inset-0 z-0 bg-ink">
                    <canvas
                        ref={canvasRef}
                        className="h-full w-full object-cover select-none"
                        aria-hidden="true"
                    />

                    {/* Dark gradient vignettes for HUD legibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/80 pointer-events-none" />
                    <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-transparent to-ink/70 pointer-events-none" />
                </div>

                {/* Preloading indicator bar */}
                {isLoading && (
                    <div className="absolute top-0 left-0 right-0 z-50 bg-black/80 p-2 text-center backdrop-blur">
                        <div className="flex items-center justify-center gap-3">
                            <span className="h-2 w-2 rounded-full bg-speed-cyan animate-ping" />
                            <span className="font-mono text-xs text-speed-cyan">
                                CARICAMENTO SEQUENZA TELEMETRICA: {loadProgress}%
                            </span>
                        </div>
                        <div className="mt-1 h-0.5 w-full bg-white/10">
                            <div
                                className="h-full bg-speed-cyan transition-all duration-200"
                                style={{ width: `${loadProgress}%` }}
                            />
                        </div>
                    </div>
                )}

                {/* Top HUD Bar */}
                <div className="relative z-10 flex items-center justify-between p-6 sm:p-10 pointer-events-none">
                    <div className="flex items-center gap-3">
                        <Badge variant="speed-cyan" size="sm">
                            [ 04 // HIGH-SPEED CAPTURE ]
                        </Badge>
                        <span className="hidden sm:inline-block font-mono text-xs text-paper-muted">
                            120 FPS RETINA SEQUENCE
                        </span>
                    </div>

                    <div className="flex items-center gap-4 bg-black/60 border border-white/10 rounded-md px-3 py-1.5 backdrop-blur-md">
                        <span className="font-mono text-xs text-paper-muted">FRAME:</span>
                        <span className="font-mono text-sm font-bold text-speed-cyan">
                            {String(currentFrame).padStart(3, '0')} / {RALLY_FRAME_COUNT}
                        </span>
                    </div>
                </div>

                {/* Interactive Center/Lower HUD overlays */}
                <div className="relative z-10 p-6 sm:p-10 max-w-2xl">
                    <div className="bg-black/75 border border-white/15 rounded-xl p-6 sm:p-8 backdrop-blur-lg shadow-2xl transition-all duration-300">
                        <div className="flex items-center justify-between mb-3 border-b border-white/10 pb-3">
                            <span className="font-mono text-xs font-bold text-neon-red tracking-wider">
                                {activePhase.range}
                            </span>
                            <span className="font-mono text-[11px] text-court-green bg-court-green/10 px-2 py-0.5 rounded border border-court-green/20">
                                STATO: ATTIVO
                            </span>
                        </div>

                        <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-paper mb-2">
                            {activePhase.title}
                        </h3>

                        <p className="text-xs sm:text-sm text-paper-muted leading-relaxed mb-4">
                            {activePhase.description}
                        </p>

                        <div className="rounded bg-white/5 p-2.5 font-mono text-xs text-speed-cyan border border-white/10 flex items-center justify-between">
                            <span>{activePhase.telemetry}</span>
                            <span className="font-bold text-white hidden sm:inline">
                                {calculatedVelocity} KM/H
                            </span>
                        </div>
                    </div>
                </div>

                {/* Bottom Frame Scrubbing Timeline HUD */}
                <div className="relative z-10 p-6 sm:p-10 pointer-events-none">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono text-paper-muted mb-2">
                        <span>0% INGRESSO</span>
                        <span className="text-speed-cyan font-bold">
                            SCROLL PER ANALISI FRAME-BY-FRAME
                        </span>
                        <span>100% COMPLETATO</span>
                    </div>

                    <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden backdrop-blur">
                        <div
                            className="h-full bg-gradient-to-r from-speed-cyan via-court-green to-neon-red transition-all duration-75"
                            style={{
                                width: `${(currentFrame / RALLY_FRAME_COUNT) * 100}%`,
                            }}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default RallySequenceSection;
