'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { gsap, useGSAP } from '@/lib/gsap';
import { championsData } from '@/data/champions';
import { Badge } from '@/components/ui/Badge';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

export function ChampionsSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const prefersReducedMotion = usePrefersReducedMotion();

    useGSAP(
        () => {
            if (prefersReducedMotion || !sectionRef.current || !trackRef.current || !scrollContainerRef.current) {
                return;
            }

            const mm = gsap.matchMedia();

            mm.add('(min-width: 1024px)', () => {
                const track = trackRef.current;
                const container = scrollContainerRef.current;
                if (!track || !container) return;

                const scrollWidth = track.scrollWidth;
                const clientWidth = container.clientWidth;
                const distanceToScroll = scrollWidth - clientWidth;

                if (distanceToScroll <= 0) return;

                const st = gsap.to(track, {
                    x: -distanceToScroll,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top top',
                        end: () => `+=${distanceToScroll + 200}`,
                        pin: true,
                        scrub: 0.8,
                        invalidateOnRefresh: true,
                    },
                });

                return () => {
                    st.scrollTrigger?.kill();
                    st.kill();
                };
            });
        },
        { scope: sectionRef, dependencies: [prefersReducedMotion] }
    );

    return (
        <section
            id="champions"
            ref={sectionRef}
            aria-label="Campioni della Storia del Tennistavolo"
            className="relative border-t border-white/5 bg-ink py-20 lg:py-0 overflow-hidden"
        >
            <div
                ref={scrollContainerRef}
                className="lg:h-screen lg:flex lg:flex-col lg:justify-center px-4 sm:px-6 lg:px-12 w-full"
            >
                {/* Header */}
                <div className="max-w-4xl mb-10 lg:mb-12">
                    <Badge variant="neon-red" size="sm" className="mb-3">
                        [ 06 // LEGGENDEDEL TENNISTAVOLO ]
                    </Badge>
                    <h2 className="text-giant font-display uppercase tracking-tight text-paper">
                        HALL OF <span className="text-neon-red">CHAMPIONS</span>
                    </h2>
                    <p className="mt-2 text-sm sm:text-base text-paper-muted">
                        I titani che hanno ridefinito la geometria del gioco con velocità d'impatto supersoniche e precisione millimetrica.
                    </p>
                </div>

                {/* Champions Cards Track */}
                <div
                    ref={trackRef}
                    className="flex flex-col sm:grid sm:grid-cols-2 lg:flex lg:flex-row gap-6 lg:gap-8 will-change-transform pb-6"
                >
                    {championsData.map((champion, idx) => (
                        <div
                            key={champion.id}
                            className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-6 lg:w-[380px] lg:shrink-0 backdrop-blur-md transition-all duration-300 hover:border-speed-cyan/50 hover:bg-white/[0.05] hover:shadow-[0_0_30px_rgba(0,240,255,0.15)]"
                        >
                            {/* Card Top Header */}
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <span className="font-mono text-xs text-paper-muted">
                                        #0{idx + 1} // HALL OF FAME
                                    </span>
                                    <span className="font-mono text-xs font-black px-2 py-0.5 rounded bg-speed-cyan/10 border border-speed-cyan/30 text-speed-cyan">
                                        {champion.country}
                                    </span>
                                </div>

                                {/* Champion Photo */}
                                <div className="relative h-64 sm:h-72 w-full rounded-xl overflow-hidden mb-6 bg-black/60 border border-white/10">
                                    <Image
                                        src={champion.image}
                                        alt={champion.name}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 380px"
                                        className="object-cover object-top filter grayscale contrast-125 transition-transform duration-500 group-hover:scale-105 group-hover:grayscale-0"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent opacity-80" />
                                </div>

                                <h3 className="text-2xl font-bold uppercase tracking-tight text-paper group-hover:text-speed-cyan transition-colors">
                                    {champion.name}
                                </h3>

                                <div className="mt-3">
                                    <span className="font-mono text-[11px] text-paper-muted uppercase tracking-wider block">
                                        PALMARÈS
                                    </span>
                                    <p className="text-xs sm:text-sm font-semibold text-court-green mt-0.5">
                                        {champion.titles}
                                    </p>
                                </div>
                            </div>

                            {/* Card Footer Style Specs */}
                            <div className="mt-6 pt-4 border-t border-white/10">
                                <span className="font-mono text-[11px] text-paper-muted uppercase tracking-wider block">
                                    STILE DI GIOCO
                                </span>
                                <p className="text-xs font-mono text-paper mt-0.5">
                                    {champion.style}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default ChampionsSection;
