import React from 'react';
import { cn } from '@/lib/utils';

export interface VisuallyHiddenProps extends React.HTMLAttributes<HTMLSpanElement> { }

export const VisuallyHidden: React.FC<VisuallyHiddenProps> = ({ className, children, ...props }) => {
    return (
        <span
            className={cn(
                'absolute -m-px h-px w-px overflow-hidden whitespace-nowrap border-0 p-0 [clip:rect(0,0,0,0)]',
                className
            )}
            {...props}
        >
            {children}
        </span>
    );
};
