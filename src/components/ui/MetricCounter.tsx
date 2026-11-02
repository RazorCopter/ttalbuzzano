'use client';

import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { gsap, ScrollTrigger } from '@/lib/gsap';

export interface MetricCounterProps extends React.HTMLAttributes<HTMLDivElement> {
    value: number;
    decimals?: number;
    prefix?: string;
    suffix?: string;
    label: string;
    sublabel?: string;
    duration?: number;
    colorVariant?: 'cyan' | 'red' | 'orange' | 'white';
}

export const MetricCounter: React.FC<MetricCounterProps> = ({
    className,
    value,
    decimals = 0,
    prefix = '',
    suffix = '',
    label,
    sublabel,
    duration = 2.0,
    colorVariant = 'cyan',
    ...props
}) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [displayValue, setDisplayValue] = useState<string>(
        `${prefix}0${decimals > 0 ? '.' + '0'.repeat(decimals) : ''}${suffix}`
    );

    const colorClasses = {
        cyan: 'text-speed-cyan drop-shadow-[0_0_20px_rgba(0,240,255,0.5)]',
        red: 'text-neon-red drop-shadow-[0_0_20px_rgba(255,42,75,0.5)]',
        orange: 'text-signal drop-shadow-[0_0_20px_rgba(255,90,31,0.5)]',
        white: 'text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]',
    };

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const counterObj = { count: 0 };

        const st = ScrollTrigger.create({
            trigger: el,
            start: 'top 85%',
            once: true,
            onEnter: () => {
                gsap.to(counterObj, {
                    count: value,
                    duration: duration,
                    ease: 'power2.out',
                    onUpdate: () => {
                        const formatted = counterObj.count.toLocaleString('it-IT', {
                            minimumFractionDigits: decimals,
                            maximumFractionDigits: decimals,
                        });
                        setDisplayValue(`${prefix}${formatted}${suffix}`);
                    },
                });
            },
        });

        return () => {
            st.kill();
        };
    }, [value, decimals, prefix, suffix, duration]);

    return (
        <div
            ref={containerRef}
            className={cn('flex flex-col select-none', className)}
            {...props}
        >
            <span
                className={cn(
                    'font-mono text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-none',
                    colorClasses[colorVariant]
                )}
            >
                {displayValue}
            </span>
            <span className="mt-2 text-sm sm:text-base font-bold tracking-wider uppercase text-paper">
                {label}
            </span>
            {sublabel && (
                <span className="text-xs sm:text-sm text-paper-muted font-sans mt-0.5">
                    {sublabel}
                </span>
            )}
        </div>
    );
};
