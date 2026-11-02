'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { gsap, useGSAP } from '@/lib/gsap';
import { ASSETS } from '@/lib/assets';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { BallScene } from '@/components/animations/three/BallScene';

export function HeroSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const badgesRef = useRef<HTMLDivElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);
    const ballContainerRef = useRef<HTMLDivElement>(null);
    const bgImageRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            if (!sectionRef.current) return;

            // Entrance animation timeline
            const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

            tl.from(bgImageRef.current, {
                scale: 1.15,
                opacity: 0.2,
                duration: 1.6,
            })
                .from(
                    titleRef.current,
                    {
                        y: 80,
                        opacity: 0,
                        duration: 1.2,
                        filter: 'blur(10px)',
                    },
                    '-=1.2'
                )
                .from(
                    subtitleRef.current,
                    {
                        y: 30,
                        opacity: 0,
                        duration: 0.9,
                    },
                    '-=0.8'
                )
                .from(
                    badgesRef.current?.children || [],
                    {
                        y: 20,
                        opacity: 0,
                        stagger: 0.1,
                        duration: 0.7,
                    },
                    '-=0.6'
                )
                .from(
                    ctaRef.current,
                    {
                        y: 20,
                        opacity: 0,
                        duration: 0.6,
                    },
                    '-=0.5'
                )
                .from(
                    ballContainerRef.current,
                    {
                        scale: 0.5,
                        opacity: 0,
                        duration: 1.4,
                        ease: 'back.out(1.5)',
                    },
                    '-=1.2'
                );

            // Parallax scroll effects
            gsap.to(titleRef.current, {
                yPercent: 45,
                opacity: 0.2,
                scale: 0.92,
                ease: 'none',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true,
                },
            });

            gsap.to(ballContainerRef.current, {
                yPercent: -25,
                xPercent: 15,
                ease: 'none',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true,
                },
            });

            gsap.to(bgImageRef.current, {
                yPercent: 20,
                ease: 'none',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true,
                },
            });
        },
        { scope: sectionRef }
    );

    const handleScrollToNext = () => {
        const nextSec = document.getElementById('intro');
        if (nextSec) {
            nextSec.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section
            id="hero"
            ref={sectionRef}
            aria-label="Hero - Beyond the Speed"
            className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 text-center"
        >
            {/* Background Image with subtle gradient darkening */}
            <div
                ref={bgImageRef}
                className="pointer-events-none absolute inset-0 z-0 opacity-40 mix-blend-screen overflow-hidden"
                aria-hidden="true"
            >
                <Image
                    src={ASSETS.hero.bg}
                    alt=""
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover object-center filter saturate-150 contrast-125"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-ink/90 via-ink/50 to-ink" />
            </div>

            {/* Decorative speed lines / grid overlay */}
            <div
                className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"
                aria-hidden="true"
            />

            {/* Interactive 3D Ball Accent Container */}
            <div
                ref={ballContainerRef}
                className="absolute right-[5%] top-[15%] sm:top-[20%] md:right-[12%] lg:right-[18%] z-10 h-44 w-44 sm:h-56 sm:w-56 lg:h-72 lg:w-72 pointer-events-auto"
                aria-hidden="true"
            >
                <BallScene
                    triggerSelector="#hero"
                    className="h-full w-full"
                    interactive={true}
                    spinType="topspin"
                    scale={1.05}
                />
            </div>

            {/* Main Hero Content */}
            <div className="container-x relative z-10 flex flex-col items-center max-w-5xl py-20">
                {/* Tactical Index Pill */}
                <div className="mb-6 flex items-center gap-2">
                    <span className="inline-block h-2 w-2 rounded-full bg-neon-red animate-pulse" />
                    <span className="font-mono text-xs font-semibold tracking-widest text-speed-cyan uppercase">
                        [ 01 // OVERVIEW // 120 KM/H REACTION BALISTICS ]
                    </span>
                </div>

                {/* Primary Mega Headline */}
                <h1
                    ref={titleRef}
                    className="text-mega font-display uppercase tracking-tight text-paper drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
                >
                    BEYOND <span className="text-neon-red drop-shadow-[0_0_35px_rgba(255,0,60,0.6)]">THE SPEED</span>
                </h1>

                {/* Narrative Lead Paragraph */}
                <p
                    ref={subtitleRef}
                    className="mt-6 max-w-2xl text-base sm:text-lg lg:text-xl text-paper-muted leading-relaxed"
                >
                    L'esperienza immersiva ad altissima frequenza nel mondo del tennistavolo agonistico:
                    scambi a 120 km/h, riflessi al limite neurologico e rotazioni supersoniche fino a 9.000 RPM.
                </p>

                {/* Telemetry Neon Badges */}
                <div
                    ref={badgesRef}
                    className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
                >
                    <Badge variant="neon-red" pulse className="px-3.5 py-1.5 text-xs font-mono font-bold tracking-wider">
                        ⚡ 112 KM/H VELOCITÀ RECORD
                    </Badge>
                    <Badge variant="court-green" className="px-3.5 py-1.5 text-xs font-mono font-bold tracking-wider">
                        🌪️ 9.000 RPM SPIN
                    </Badge>
                    <Badge variant="speed-cyan" className="px-3.5 py-1.5 text-xs font-mono font-bold tracking-wider">
                        {'⏱️ < 200 MS REAZIONE'}
                    </Badge>
                </div>

                {/* Interactive Action CTAs */}
                <div ref={ctaRef} className="mt-10 flex flex-col sm:flex-row items-center gap-4">
                    <Button
                        variant="primary"
                        size="lg"
                        onClick={handleScrollToNext}
                        className="shadow-[0_0_25px_rgba(255,0,60,0.4)]"
                    >
                        ESPLORA LA VELOCITÀ ↓
                    </Button>
                    <a
                        href="#rally"
                        className="inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-widest text-paper-muted hover:text-speed-cyan transition-colors py-2 px-4 rounded border border-white/10 hover:border-speed-cyan/50"
                    >
                        <span>VAI AL RALLY FRAME-BY-FRAME</span>
                        <span aria-hidden="true">→</span>
                    </a>
                </div>
            </div>

            {/* Scroll indicator chevron */}
            <div
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
                onClick={handleScrollToNext}
                role="button"
                tabIndex={0}
                aria-label="Scorri alla sezione successiva"
            >
                <span className="font-mono text-[10px] uppercase tracking-widest text-paper-muted">SCROLL</span>
                <span className="inline-block h-6 w-[2px] bg-gradient-to-b from-speed-cyan to-transparent animate-bounce" />
            </div>
        </section>
    );
}

export default HeroSection;
