'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { gsap, useGSAP } from '@/lib/gsap';
import { equipmentData } from '@/data/equipment';
import { Badge } from '@/components/ui/Badge';

export function EquipmentSection() {
    const [activeIndex, setActiveIndex] = useState(0);
    const sectionRef = useRef<HTMLElement>(null);
    const previewRef = useRef<HTMLDivElement>(null);
    const specsRef = useRef<HTMLDivElement>(null);

    const activeItem = equipmentData[activeIndex] ?? equipmentData[0]!;

    useGSAP(
        () => {
            if (!previewRef.current || !specsRef.current) return;

            gsap.fromTo(
                previewRef.current,
                { opacity: 0, scale: 0.95 },
                { opacity: 1, scale: 1, duration: 0.4, ease: 'power2.out' }
            );

            gsap.fromTo(
                specsRef.current,
                { opacity: 0, x: 20 },
                { opacity: 1, x: 0, duration: 0.45, ease: 'power2.out' }
            );
        },
        { dependencies: [activeIndex] }
    );

    return (
        <section
            id="equipment"
            ref={sectionRef}
            aria-label="Attrezzatura e Materiali Tecnologici"
            className="relative flex min-h-screen flex-col justify-center border-t border-white/5 bg-ink py-24 sm:py-32"
        >
            <div className="container-x max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <Badge variant="signal-orange" size="sm" className="mb-4">
                        [ 07 // INGEGNERIA DEI MATERIALI ]
                    </Badge>
                    <h2 className="text-giant font-display uppercase tracking-tight text-paper">
                        PRECISION <span className="text-signal">ENGINEERING</span>
                    </h2>
                    <p className="mt-4 text-base sm:text-lg text-paper-muted">
                        Dalle trame molecolari in fibra di carbonio aramidico alle superfici di contatto a poro aperto:
                        la fisica dell'attrezzatura omologata ITTF.
                    </p>
                </div>

                {/* Equipment Category Selector Tabs */}
                <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-12">
                    {equipmentData.map((item, index) => {
                        const isActive = index === activeIndex;
                        return (
                            <button
                                key={item.id}
                                onClick={() => setActiveIndex(index)}
                                className={`px-5 py-3 rounded-lg font-mono text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 border ${isActive
                                    ? 'bg-signal/20 border-signal text-signal shadow-[0_0_20px_rgba(255,90,31,0.35)] scale-105'
                                    : 'bg-white/5 border-white/10 text-paper-muted hover:border-white/20 hover:text-white'
                                    }`}
                            >
                                {item.name.split(' ')[0]} // {item.name.split(' ').slice(1, 3).join(' ')}
                            </button>
                        );
                    })}
                </div>

                {/* Main Split Showcase */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white/[0.02] border border-white/10 rounded-2xl p-6 sm:p-10 backdrop-blur-md">
                    {/* Left: Image Showcase with Neon Frame */}
                    <div
                        ref={previewRef}
                        className="lg:col-span-6 relative flex flex-col items-center justify-center min-h-[320px] sm:min-h-[420px] bg-black/60 rounded-xl overflow-hidden border border-white/10 p-4"
                    >
                        <div className="absolute top-4 left-4 z-10">
                            <span className="font-mono text-xs font-bold text-signal uppercase tracking-wider bg-black/70 px-2.5 py-1 rounded border border-signal/30">
                                {activeItem.id.toUpperCase()}
                            </span>
                        </div>

                        <div className="relative h-64 sm:h-80 w-full">
                            <Image
                                src={activeItem.image}
                                alt={activeItem.name}
                                fill
                                sizes="(max-width: 1024px) 100vw, 500px"
                                className="object-contain filter drop-shadow-[0_0_25px_rgba(255,90,31,0.25)]"
                            />
                        </div>

                        <div className="absolute bottom-4 right-4 z-10">
                            <span className="font-mono text-[11px] text-paper-muted bg-black/70 px-2 py-0.5 rounded border border-white/10">
                                ITTF STANDARD // 2026
                            </span>
                        </div>
                    </div>

                    {/* Right: Technical Blueprint Specs */}
                    <div ref={specsRef} className="lg:col-span-6 flex flex-col justify-between">
                        <div>
                            <span className="font-mono text-xs uppercase tracking-widest text-speed-cyan">
                                // SPECIFICHE TECNICHE COSTRUTTIVE
                            </span>
                            <h3 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-paper mt-1 mb-3">
                                {activeItem.name}
                            </h3>
                            <p className="text-sm sm:text-base text-paper-muted leading-relaxed mb-6">
                                {activeItem.description}
                            </p>
                        </div>

                        {/* Specs Grid */}
                        <div className="space-y-3 pt-4 border-t border-white/10">
                            {activeItem.specs.map((spec, sIdx) => (
                                <div
                                    key={sIdx}
                                    className="flex items-center justify-between p-3 rounded-lg bg-black/40 border border-white/5"
                                >
                                    <span className="font-mono text-xs text-paper-muted uppercase tracking-wider">
                                        {spec.label}
                                    </span>
                                    <span className="font-mono text-xs sm:text-sm font-bold text-signal">
                                        {spec.value}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default EquipmentSection;
