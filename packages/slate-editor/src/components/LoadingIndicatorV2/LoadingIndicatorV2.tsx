import classNames from 'classnames';
import React from 'react';

import { FiniteLoadingIndicator } from './FiniteLoadingIndicator';
import { InfiniteLoadingIndicator } from './InfiniteLoadingIndicator';
import styles from './LoadingIndicatorV2.module.scss';

interface Props {
    className?: string;
    height?: number;
    /**
     * 0 ≤ progress ≤ 1
     */
    progress?: number;
    width?: number;
}

export function LoadingIndicatorV2({ className, height = 24, progress, width = 24 }: Props) {
    return (
        <div className={classNames(styles.LoadingIndicator, className)} style={{ width, height }}>
            {typeof progress === 'number' ? (
                <FiniteLoadingIndicator height={height} progress={progress} width={width} />
            ) : (
                <InfiniteLoadingIndicator height={height} width={width} />
            )}
        </div>
    );
}
