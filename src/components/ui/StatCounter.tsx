import React from 'react';
import { MetricCounter, type MetricCounterProps } from './MetricCounter';

export type StatCounterProps = MetricCounterProps;

export const StatCounter: React.FC<StatCounterProps> = (props) => {
    return <MetricCounter {...props} />;
};
