'use client';

import { useState, useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import { Badge } from '@/components/ui/Badge';
import { BallScene } from '@/components/animations/three/BallScene';

type SpinType = 'topspin' | 'backspin' | 'sidespin';

interface SpinDetail {
    id: SpinType;
    label: string;
    rpm: string;
    forceDirection: string;
    trajectory: string;
    physicsLaw: string;
    description: string;
    stats: { label: string; value: string }[];
}

const SPIN_OPTIONS: SpinDetail[] = [
    {
        id: 'topspin',
        label: 'TOPSPIN (Attacco)',
        rpm: '7.500 - 9.000 RPM',
        forceDirection: 'Forza di Magnus verso il BASSO (Downforce)',
        trajectory: 'Arco accentuato: tuffo repentino sul tavolo e rimbalzo aggressivo verso l\'avversario',
        physicsLaw: 'La velocità dell\'aria è maggiore sotto la sfera; la pressione è minore in basso, forzando la pallina verso il tavolo a velocità elevata.',
        description:
            'Il colpo d\'attacco fondamentale del tennistavolo moderno. Consente di colpire la pallina con massima potenza sopra la quota della rete facendola ricadere esattamente all\'interno del campo avversario.',
        stats: [
            { label: 'Velocità Tipica', value: '90-115 km/h' },
            { label: 'Rotazione', value: '150 giri/sec' },
            { label: 'Angolo Impatto', value: '35° - 45°' },
            { label: 'Effetto al Rimbalzo', value: 'Accelerazione orizzontale' },
        ],
    },
    {
        id: 'backspin',
        label: 'BACKSPIN (Chop Difensivo)',
        rpm: '5.000 - 7.000 RPM',
        forceDirection: 'Forza di Magnus verso l\'ALTO (Lift Portante)',
        trajectory: 'Galleggiamento radente: la pallina fluttua e muore sul tavolo frenando bruscamente',
        physicsLaw: 'La velocità dell\'aria è maggiore sopra la sfera generando un differenziale di pressione che contrasta la gravità terrestre, prolungando il tempo di volo.',
        description:
            'L\'arma primaria dei difensori classici (modern choppers). L\'altissima rotazione contraria rende estremamente difficile per l\'avversario attaccare, facendogli mandare la pallina in rete se non corregge l\'angolo.',
        stats: [
            { label: 'Velocità Tipica', value: '40-70 km/h' },
            { label: 'Rotazione', value: '110 giri/sec' },
            { label: 'Angolo Impatto', value: '65° - 80°' },
            { label: 'Effetto al Rimbalzo', value: 'Frenata e rimbalzo basso' },
        ],
    },
    {
        id: 'sidespin',
        label: 'SIDESPIN (Curva & Fade)',
        rpm: '4.500 - 6.500 RPM',
        forceDirection: 'Forza di Magnus LATERALE (Deviazione Oraria/Antioraria)',
        trajectory: 'Curva parabolica laterale a banana con espansione verso l\'esterno del tavolo',
        physicsLaw: 'Il gradiente di pressione laterale devia la traiettoria di oltre 40 centimetri rispetto all\'asse rettilineo prima del contatto sul piano di gioco.',
        description:
            'Usato nei servizi veloci (hook serve, tomahawk) e nei contro-topspin diagonali. Obbliga l\'avversario a posizionarsi fuori asse e crea rimbalzi a uscire quasi impossibili da controllare.',
        stats: [
            { label: 'Velocità Tipica', value: '60-85 km/h' },
            { label: 'Rotazione', value: '95 giri/sec' },
            { label: 'Deviazione Max', value: '± 45 cm' },
            { label: 'Effetto al Rimbalzo', value: 'Schizzo angolato laterale' },
        ],
    },
];

export function SpinSection() {
    const [selectedSpin, setSelectedSpin] = useState<SpinType>('topspin');
    const sectionRef = useRef<HTMLElement>(null);
    const detailsRef = useRef<HTMLDivElement>(null);

    const currentDetail =
        SPIN_OPTIONS.find((s) => s.id === selectedSpin) ??
        (SPIN_OPTIONS[0] as SpinDetail);

    useGSAP(
        () => {
            if (!detailsRef.current) return;

            gsap.fromTo(
                detailsRef.current,
                { opacity: 0, y: 15 },
                { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' }
            );
        },
        { dependencies: [selectedSpin] }
    );

    return (
        <section
            id="spin"
            ref={sectionRef}
            aria-label="Fisica dello Spin ed Effetto Magnus"
            className="relative flex min-h-screen flex-col justify-center border-t border-white/5 bg-ink py-24 sm:py-32"
        >
            <div className="container-x max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <Badge variant="court-green" size="sm" className="mb-4">
                        [ 05 // FISICA BALISTICA DELLO SPIN ]
                    </Badge>
                    <h2 className="text-giant font-display uppercase tracking-tight text-paper">
                        EFFETTO <span className="text-court-green">MAGNUS</span>
                    </h2>
                    <p className="mt-4 text-base sm:text-lg text-paper-muted">
                        Una sfera di 40 mm che ruota fino a 150 volte al secondo altera la densità dell'aria circostante,
                        piegando la fisica newtoniana in traiettorie che sfidano l'intuito umano.
                    </p>
                </div>

                {/* Spin Mode Selector Tabs */}
                <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-12">
                    {SPIN_OPTIONS.map((spin) => {
                        const isSelected = spin.id === selectedSpin;
                        return (
                            <button
                                key={spin.id}
                                onClick={() => setSelectedSpin(spin.id)}
                                className={`px-5 py-3 rounded-lg font-mono text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 border ${isSelected
                                    ? 'bg-court-green/20 border-court-green text-court-green shadow-[0_0_20px_rgba(0,168,107,0.35)] scale-105'
                                    : 'bg-white/5 border-white/10 text-paper-muted hover:border-white/20 hover:text-white'
                                    }`}
                            >
                                {spin.label}
                            </button>
                        );
                    })}
                </div>

                {/* Interactive Split View: 3D Ball & Physics Vector Inspector */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    {/* Left: 3D WebGL Ball Simulation */}
                    <div className="lg:col-span-5 relative flex flex-col items-center justify-center bg-black/50 border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-md min-h-[380px] sm:min-h-[440px] overflow-hidden">
                        <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-court-green animate-ping" />
                            <span className="font-mono text-xs font-bold text-court-green uppercase">
                                SIMULATORE 3D IN TEMPO REALE
                            </span>
                        </div>

                        {/* Three.js Ball Scene with dynamic spin type */}
                        <div className="h-64 w-64 sm:h-72 sm:w-72 relative">
                            <BallScene
                                key={selectedSpin}
                                triggerSelector="#spin"
                                interactive={true}
                                spinType={selectedSpin}
                                ballColor="#ff621f"
                                scale={1.2}
                                showTrail={true}
                            />
                        </div>

                        {/* Telemetry vector badge below ball */}
                        <div className="mt-4 text-center z-10">
                            <span className="font-mono text-xs text-paper-muted block">
                                VETTORE FORZA GENERATA:
                            </span>
                            <span className="font-mono text-sm font-black text-court-green mt-0.5 block">
                                {currentDetail.forceDirection}
                            </span>
                        </div>
                    </div>

                    {/* Right: Technical Explanation & Aerodynamic Breakdown */}
                    <div
                        ref={detailsRef}
                        className="lg:col-span-7 bg-white/[0.02] border border-white/10 rounded-2xl p-6 sm:p-10 backdrop-blur-md"
                    >
                        <div className="flex flex-wrap items-center justify-between gap-4 mb-4 pb-4 border-b border-white/10">
                            <div>
                                <span className="font-mono text-xs uppercase tracking-widest text-speed-cyan">
                                    // DINAMICA DEI FLUIDI
                                </span>
                                <h3 className="text-2xl font-bold uppercase tracking-tight text-paper mt-1">
                                    {currentDetail.label}
                                </h3>
                            </div>
                            <div className="font-mono text-sm font-black px-3 py-1.5 rounded bg-court-green/10 border border-court-green/30 text-court-green">
                                {currentDetail.rpm}
                            </div>
                        </div>

                        <p className="text-sm sm:text-base text-paper-muted leading-relaxed mb-6">
                            {currentDetail.description}
                        </p>

                        {/* Aerodynamic Law Card */}
                        <div className="bg-white/5 border border-white/10 rounded-xl p-4 sm:p-5 mb-6">
                            <span className="font-mono text-xs font-bold uppercase tracking-wider text-speed-cyan block mb-1">
                                🔬 Legge Fisica di Bernoulli & Magnus
                            </span>
                            <p className="text-xs sm:text-sm text-paper leading-relaxed">
                                {currentDetail.physicsLaw}
                            </p>
                        </div>

                        {/* Trajectory description */}
                        <div className="mb-6">
                            <span className="font-mono text-xs uppercase tracking-widest text-paper-muted block mb-1">
                                COMPORTAMENTO BALISTICO
                            </span>
                            <p className="text-sm text-court-green font-semibold">
                                {currentDetail.trajectory}
                            </p>
                        </div>

                        {/* Specs Grid */}
                        <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/10">
                            {currentDetail.stats.map((s, idx) => (
                                <div key={idx} className="bg-black/40 rounded-lg p-3 border border-white/5">
                                    <span className="font-mono text-[11px] text-paper-muted block">
                                        {s.label}
                                    </span>
                                    <span className="font-mono text-xs sm:text-sm font-bold text-paper block mt-0.5">
                                        {s.value}
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

export default SpinSection;
