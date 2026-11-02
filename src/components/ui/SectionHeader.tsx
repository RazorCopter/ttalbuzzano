import React from 'react';
import { cn } from '@/lib/utils';

export interface SectionHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
    overline?: string;
    title: string;
    highlightTitle?: string;
    description?: string;
    align?: 'left' | 'center' | 'right';
    overlineVariant?: 'cyan' | 'red' | 'orange';
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
    className,
    overline,
    title,
    highlightTitle,
    description,
    align = 'left',
    overlineVariant = 'cyan',
    ...props
}) => {
    const alignStyles = {
        left: 'text-left items-start',
        center: 'text-center items-center',
        right: 'text-right items-end',
    };

    const overlineColors = {
        cyan: 'text-speed-cyan border-speed-cyan/30 bg-speed-cyan/10 shadow-[0_0_15px_rgba(0,240,255,0.2)]',
        red: 'text-neon-red border-neon-red/30 bg-neon-red/10 shadow-[0_0_15px_rgba(255,42,75,0.2)]',
        orange: 'text-signal border-signal/30 bg-signal/10 shadow-[0_0_15px_rgba(255,90,31,0.2)]',
    };

    return (
        <div
            className={cn('flex flex-col gap-4 max-w-3xl mb-12 md:mb-16', alignStyles[align], className)}
            {...props}
        >
            {overline && (
                <div
                    className={cn(
                        'inline-flex items-center gap-2 px-3 py-1 text-xs font-mono font-bold tracking-widest uppercase rounded-sm border',
                        overlineColors[overlineVariant]
                    )}
                >
                    <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                    <span>{overline}</span>
                </div>
            )}

            <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight uppercase leading-[0.92]">
                {title}{' '}
                {highlightTitle && (
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-speed-cyan via-white to-neon-red drop-shadow-[0_0_20px_rgba(0,240,255,0.4)]">
                        {highlightTitle}
                    </span>
                )}
            </h2>

            {description && (
                <p className="text-base md:text-xl text-paper-muted leading-relaxed font-sans font-light">
                    {description}
                </p>
            )}
        </div>
    );
};
