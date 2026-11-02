import React from 'react';
import { cn } from '@/lib/utils';

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    as?: React.ElementType;
    clean?: boolean;
}

export const Container: React.FC<ContainerProps> = ({
    as: Component = 'div',
    clean = false,
    className,
    children,
    ...props
}) => {
    return (
        <Component
            className={cn(!clean && 'container-x w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8', className)}
            {...props}
        >
            {children}
        </Component>
    );
};
