import classNames from 'classnames';
import type { HTMLAttributes } from 'react';
import React from 'react';

import { FiniteLoadingIndicator } from './FiniteLoadingIndicator';
import { InfiniteLoadingIndicator } from './InfiniteLoadingIndicator';
import styles from './LoadingIndicator.module.scss';

interface Props extends HTMLAttributes<HTMLDivElement> {
    className?: string;
    height?: number;
    /**
     * 0 ≤ progress ≤ 1
     */
    progress?: number;
    width?: number;
}

export function LoadingIndicator({
    className,
    height = 24,
    progress,
    width = 24,
    ...attributes
}: Props) {
    return (
        <div
            {...attributes}
            className={classNames(styles.LoadingIndicator, className)}
            style={{ ...attributes.style, width, height }}
        >
            {typeof progress === 'number' ? (
                <FiniteLoadingIndicator height={height} progress={progress} width={width} />
            ) : (
                <InfiniteLoadingIndicator height={height} width={width} />
            )}
        </div>
    );
}
