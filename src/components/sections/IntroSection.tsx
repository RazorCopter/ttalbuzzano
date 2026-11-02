'use client';

import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import { Badge } from '@/components/ui/Badge';

const NARRATIVE_PARAGRAPHS = [
    'A una distanza di appena 2,74 metri tra i due contendenti, il tennistavolo agonistico opera oltre la soglia cosciente della percezione umana.',
    'Quando uno smash scagliato a 120 km/h copre l\'intera lunghezza del tavolo in appena 180 millisecondi, l\'atleta non ha il tempo fisico di pensare o calcolare.',
    'L\'occhio impiega 100 millisecondi solo per registrare il movimento; il cervello ne spende altri 50 per elaborare il segnale. Restano meno di 30 millisecondi per attivare la fibra muscolare, posizionare la racchetta con un angolo di frazione di grado e colpire.',
    'Non è calcolo razionale: è pura memoria cinestetica subcosciente, scolpita da milioni di ripetizioni al confine delle leggi balistiche.',
];

const TIMELINE_DATA = [
    { label: 'Stimolo Visivo', time: '0-100 ms', desc: 'Riconoscimento ottico della rotazione e del punto di impatto', color: 'text-speed-cyan' },
    { label: 'Elaborazione Neurale', time: '100-150 ms', desc: 'Previsione traiettoria e calcolo motorio riflesso', color: 'text-signal' },
    { label: 'Attivazione Muscolare', time: '150-180 ms', desc: 'Contrazione esplosiva dell\'avambraccio e chiusura polso', color: 'text-neon-red' },
    { label: 'Impatto Pallina', time: '180 ms', desc: 'Contatto gomma-pallina: tempo totale di volo esaurito', color: 'text-court-green' },
];

export function IntroSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const textContainerRef = useRef<HTMLDivElement>(null);
    const telemetryRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            if (!sectionRef.current) return;

            // Word-by-word scrub reveal
            const words = textContainerRef.current?.querySelectorAll('.scrub-word');
            if (words && words.length > 0) {
                gsap.fromTo(
                    words,
                    { opacity: 0.15 },
                    {
                        opacity: 1,
                        stagger: 0.05,
                        ease: 'none',
                        scrollTrigger: {
                            trigger: textContainerRef.current,
                            start: 'top 75%',
                            end: 'bottom 45%',
                            scrub: true,
                        },
                    }
                );
            }

            // Telemetry bars animation
            const items = telemetryRef.current?.querySelectorAll('.telemetry-item');
            if (items && items.length > 0) {
                gsap.from(items, {
                    x: -30,
                    opacity: 0,
                    stagger: 0.15,
                    duration: 0.8,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: telemetryRef.current,
                        start: 'top 80%',
                    },
                });
            }
        },
        { scope: sectionRef }
    );

    return (
        <section
            id="intro"
            ref={sectionRef}
            aria-label="Introduzione all'anatomia della reazione"
            className="relative flex min-h-screen flex-col justify-center border-t border-white/5 bg-ink py-24 sm:py-32"
        >
            <div className="container-x max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Index & Section Heading */}
                <div className="mb-10 text-center sm:text-left">
                    <div className="inline-flex items-center gap-2 mb-3">
                        <Badge variant="speed-cyan" size="sm">
                            [ 02 // NEURO-BALLISTICS ]
                        </Badge>
                    </div>
                    <h2 className="text-giant font-display uppercase tracking-tight text-paper">
                        LA FRAZIONE DI <span className="text-neon-red">SECONDO</span>
                    </h2>
                    <p className="mt-2 font-mono text-xs uppercase tracking-widest text-paper-muted">
                        Anatomia di un riflesso al limite biologico: 180 millisecondi di tempo totale.
                    </p>
                </div>

                {/* Narrative Scrub Paragraphs */}
                <div
                    ref={textContainerRef}
                    className="space-y-6 text-xl sm:text-2xl md:text-3xl font-display leading-relaxed text-paper"
                >
                    {NARRATIVE_PARAGRAPHS.map((paragraph, pIdx) => {
                        const words = paragraph.split(' ');
                        return (
                            <p key={pIdx} className="leading-snug">
                                {words.map((word, wIdx) => (
                                    <span
                                        key={wIdx}
                                        className="scrub-word inline-block mr-[0.28em] transition-colors"
                                    >
                                        {word}
                                    </span>
                                ))}
                            </p>
                        );
                    })}
                </div>

                {/* Neurological Telemetry Breakdown Grid */}
                <div className="mt-20 pt-12 border-t border-white/10">
                    <div className="mb-8 flex items-center justify-between flex-wrap gap-4">
                        <div>
                            <span className="font-mono text-xs uppercase tracking-widest text-speed-cyan">
                                // TELEMETRIA BIOLOGICA
                            </span>
                            <h3 className="text-xl font-bold uppercase tracking-tight text-paper mt-1">
                                Scomposizione del Tempo di Reazione
                            </h3>
                        </div>
                        <div className="font-mono text-xs text-paper-muted">
                            DISTANZA TAVOLO: <span className="text-paper font-bold">2.74 METRI</span>
                        </div>
                    </div>

                    <div ref={telemetryRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {TIMELINE_DATA.map((item, index) => (
                            <div
                                key={index}
                                className="telemetry-item relative rounded-lg border border-white/10 bg-white/[0.02] p-5 backdrop-blur hover:border-speed-cyan/40 transition-all duration-300"
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <span className="font-mono text-xs text-paper-muted">0{index + 1}</span>
                                    <span className={`font-mono text-xs font-bold ${item.color}`}>
                                        {item.time}
                                    </span>
                                </div>
                                <h4 className="font-bold text-base text-paper mb-2">{item.label}</h4>
                                <p className="text-xs text-paper-muted leading-relaxed">{item.desc}</p>
                                <div className="mt-4 h-1 w-full bg-white/10 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full ${index === 0
                                            ? 'w-[55%] bg-speed-cyan'
                                            : index === 1
                                                ? 'w-[80%] bg-signal'
                                                : index === 2
                                                    ? 'w-[95%] bg-neon-red'
                                                    : 'w-full bg-court-green'
                                            }`}
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

export default IntroSection;
