import React from 'react';

import { ClippedRing } from './ClippedRing';
import { Head } from './Head';
import styles from './LoadingIndicatorV2.module.scss';

interface Props {
    height: number;
    /**
     * 0 ≤ progress ≤ 1
     */
    progress: number;
    width: number;
}

export function FiniteLoadingIndicator({ height, progress, width }: Props) {
    return (
        <>
            <ClippedRing
                clip={1}
                color="currentColor"
                opacity="0.4"
                height={height}
                width={width}
            />
            <ClippedRing
                className={styles.progress}
                clip={progress}
                color="currentColor"
                height={height}
                width={width}
            />
            <Head className={styles.head} color="currentColor" height={height} width={width} />
            <Head
                className={styles.head}
                color="currentColor"
                height={height}
                style={{
                    transform: `rotate(${progress * 360}deg)`,
                }}
                width={width}
            />
        </>
    );
}
