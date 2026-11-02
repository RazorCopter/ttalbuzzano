import React from 'react';
import { SectionHeader, type SectionHeaderProps } from './SectionHeader';

export interface SectionHeadingProps extends Omit<SectionHeaderProps, 'overline'> {
    eyebrow?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({ eyebrow, ...props }) => {
    return <SectionHeader overline={eyebrow} {...props} />;
};
