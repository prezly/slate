import classNames from 'classnames';
import type { HTMLAttributes, ReactNode } from 'react';
import React, { forwardRef } from 'react';

import { useExtrapolatedProgress } from './lib';

export interface Props extends HTMLAttributes<HTMLDivElement> {
    children: (props: { percent: string }) => ReactNode;
    className?: string;
    estimatedDuration: number;
    /**
     * 0 ≤ progress ≤ 1
     */
    progress?: number;
}

export const Placeholder = forwardRef<HTMLDivElement, Props>(
    ({ children, className, estimatedDuration, progress = 0, ...props }, ref) => {
        const extrapolatedProgress = useExtrapolatedProgress(progress, estimatedDuration);
        const percent = `${(100 * extrapolatedProgress).toFixed(0)}%`;

        return (
            <div {...props} className={classNames('loading-placeholder-v2', className)} ref={ref}>
                {children({ percent })}
            </div>
        );
    },
);

Placeholder.displayName = 'forwardRef(LoadingPlaceholderV2.Placeholder)';
