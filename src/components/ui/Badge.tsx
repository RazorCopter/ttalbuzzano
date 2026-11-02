import React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    variant?: 'neon-red' | 'speed-cyan' | 'court-green' | 'signal-orange' | 'neutral';
    size?: 'sm' | 'md';
    pulse?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
    className,
    variant = 'speed-cyan',
    size = 'md',
    pulse = false,
    children,
    ...props
}) => {
    const baseStyles =
        'inline-flex items-center font-mono font-bold tracking-widest uppercase rounded-sm border backdrop-blur-md select-none transition-all duration-300';

    const sizeStyles = {
        sm: 'text-[10px] px-2 py-0.5 gap-1.5',
        md: 'text-xs px-3 py-1 gap-2',
    };

    const variantStyles = {
        'speed-cyan':
            'bg-speed-cyan/10 border-speed-cyan/40 text-speed-cyan shadow-[0_0_12px_rgba(0,240,255,0.25)]',
        'neon-red':
            'bg-neon-red/10 border-neon-red/40 text-neon-red shadow-[0_0_12px_rgba(255,42,75,0.25)]',
        'court-green':
            'bg-court-green/10 border-court-green/40 text-court-green shadow-[0_0_12px_rgba(0,168,107,0.25)]',
        'signal-orange':
            'bg-signal/10 border-signal/40 text-signal shadow-[0_0_12px_rgba(255,90,31,0.25)]',
        neutral:
            'bg-white/5 border-white/20 text-paper-muted hover:text-white',
    };

    return (
        <span
            className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
            {...props}
        >
            {pulse && (
                <span className="relative flex h-2 w-2">
                    <span
                        className={cn(
                            'absolute inline-flex h-full w-full animate-ping rounded-full opacity-75',
                            variant === 'speed-cyan' && 'bg-speed-cyan',
                            variant === 'neon-red' && 'bg-neon-red',
                            variant === 'court-green' && 'bg-court-green',
                            variant === 'signal-orange' && 'bg-signal',
                            variant === 'neutral' && 'bg-white'
                        )}
                    />
                    <span
                        className={cn(
                            'relative inline-flex h-2 w-2 rounded-full',
                            variant === 'speed-cyan' && 'bg-speed-cyan',
                            variant === 'neon-red' && 'bg-neon-red',
                            variant === 'court-green' && 'bg-court-green',
                            variant === 'signal-orange' && 'bg-signal',
                            variant === 'neutral' && 'bg-white'
                        )}
                    />
                </span>
            )}
            {children}
        </span>
    );
};
