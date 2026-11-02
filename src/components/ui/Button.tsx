import React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'glow';
    size?: 'sm' | 'md' | 'lg';
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            className,
            variant = 'primary',
            size = 'md',
            leftIcon,
            rightIcon,
            children,
            disabled,
            ...props
        },
        ref
    ) => {
        const baseStyles =
            'inline-flex items-center justify-center font-bold uppercase tracking-wider transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none';

        const sizeStyles = {
            sm: 'h-9 px-4 text-xs gap-1.5 rounded-sm',
            md: 'h-11 px-6 text-sm gap-2 rounded-sm',
            lg: 'h-14 px-8 text-base gap-3 rounded-sm',
        };

        const variantStyles = {
            primary:
                'bg-neon-red text-white hover:bg-neon-red/90 hover:shadow-[0_0_25px_rgba(255,42,75,0.6)] focus-visible:ring-neon-red border border-neon-red/60 active:scale-95',
            secondary:
                'bg-ink-soft text-paper hover:bg-white/10 hover:text-white border border-white/10 focus-visible:ring-white/50 active:scale-95',
            outline:
                'bg-transparent text-speed-cyan border border-speed-cyan/50 hover:bg-speed-cyan/10 hover:border-speed-cyan hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] focus-visible:ring-speed-cyan active:scale-95',
            glow:
                'bg-speed-cyan text-ink font-extrabold hover:bg-speed-cyan/90 hover:shadow-[0_0_30px_rgba(0,240,255,0.8)] focus-visible:ring-speed-cyan border border-speed-cyan active:scale-95',
        };

        return (
            <button
                ref={ref}
                disabled={disabled}
                className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
                {...props}
            >
                {leftIcon && <span className="inline-flex shrink-0 items-center">{leftIcon}</span>}
                <span>{children}</span>
                {rightIcon && <span className="inline-flex shrink-0 items-center">{rightIcon}</span>}
            </button>
        );
    }
);

Button.displayName = 'Button';
