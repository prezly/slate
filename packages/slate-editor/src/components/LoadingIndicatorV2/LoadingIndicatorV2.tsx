import classNames from 'classnames';
import type { FunctionComponent } from 'react';
import React from 'react';

import FiniteLoadingIndicator from './FiniteLoadingIndicator';
import InfiniteLoadingIndicator from './InfiniteLoadingIndicator';
import './LoadingIndicatorV2.scss';

interface Props {
    className?: string;
    height?: number;
    /**
     * 0 ≤ progress ≤ 1
     */
    progress?: number;
    width?: number;
}

const LoadingIndicatorV2: FunctionComponent<Props> = ({
    className,
    height = 24,
    progress,
    width = 24,
}) => (
    <div className={classNames('loading-indicator-v2', className)} style={{ width, height }}>
        {typeof progress === 'number' ? (
            <FiniteLoadingIndicator height={height} progress={progress} width={width} />
        ) : (
            <InfiniteLoadingIndicator height={height} width={width} />
        )}
    </div>
);

export default LoadingIndicatorV2;
