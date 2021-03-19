import classNames from 'classnames';
import React, { forwardRef, HTMLAttributes, ReactNode } from 'react';

import Description from './Description';
import Icon from './Icon';
import { useExtrapolatedProgress } from './lib';
import './LoadingPlaceholderV2.scss';
import ProgressBar from './ProgressBar';

export interface Props extends HTMLAttributes<HTMLDivElement> {
    children: (props: { percent: string }) => ReactNode;
    className?: string;
    estimatedDuration: number;
    /**
     * 0 ≤ progress ≤ 1
     */
    progress?: number;
}

const LoadingPlaceholderV2 = forwardRef<HTMLDivElement, Props>(
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

export default Object.assign(LoadingPlaceholderV2, {
    Description,
    Icon,
    ProgressBar,
});
