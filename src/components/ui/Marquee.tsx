'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
    speed?: number; // duration in seconds
    pauseOnHover?: boolean;
    reverse?: boolean;
}

export const Marquee: React.FC<MarqueeProps> = ({
    className,
    speed = 25,
    pauseOnHover = true,
    reverse = false,
    children,
    ...props
}) => {
    return (
        <div
            className={cn('flex w-full overflow-hidden select-none', className)}
            {...props}
        >
            <div
                className={cn(
                    'flex min-w-full shrink-0 items-center justify-around gap-8 animate-marquee',
                    reverse && 'direction-reverse',
                    pauseOnHover && 'hover:[animation-play-state:paused]'
                )}
                style={{ animationDuration: `${speed}s` }}
            >
                {children}
            </div>
            <div
                aria-hidden="true"
                className={cn(
                    'flex min-w-full shrink-0 items-center justify-around gap-8 animate-marquee',
                    reverse && 'direction-reverse',
                    pauseOnHover && 'hover:[animation-play-state:paused]'
                )}
                style={{ animationDuration: `${speed}s` }}
            >
                {children}
            </div>
        </div>
    );
};
