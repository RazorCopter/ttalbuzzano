import React from 'react';
import { cn } from '@/lib/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: 'glass' | 'solid' | 'interactive';
    glowColor?: 'cyan' | 'red' | 'none';
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
    (
        {
            className,
            variant = 'glass',
            glowColor = 'none',
            children,
            ...props
        },
        ref
    ) => {
        const baseStyles = 'relative rounded-lg overflow-hidden transition-all duration-300';

        const variantStyles = {
            glass:
                'bg-ink-soft/60 backdrop-blur-xl border border-white/10 hover:border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.5)]',
            solid:
                'bg-ink-soft border border-white/10 shadow-xl',
            interactive:
                'bg-ink-soft/70 backdrop-blur-xl border border-white/10 hover:border-speed-cyan/50 hover:shadow-[0_0_30px_rgba(0,240,255,0.15)] hover:-translate-y-1 cursor-pointer',
        };

        const glowStyles = {
            cyan: 'shadow-[0_0_30px_rgba(0,240,255,0.2)] border-speed-cyan/40',
            red: 'shadow-[0_0_30px_rgba(255,42,75,0.2)] border-neon-red/40',
            none: '',
        };

        return (
            <div
                ref={ref}
                className={cn(baseStyles, variantStyles[variant], glowStyles[glowColor], className)}
                {...props}
            >
                {/* Subtle top glare highlight line */}
                <div className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                {children}
            </div>
        );
    }
);

Card.displayName = 'Card';
