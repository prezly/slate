import type { ReactNode } from 'react';
import React from 'react';

import styles from './LoadingDots.module.scss';

export function LoadingDots() {
    return (
        <>
            <span className={styles.Dot}>.</span>
            <span className={styles.Dot}>.</span>
            <span className={styles.Dot}>.</span>
        </>
    );
}

export function withLoadingDots(content: ReactNode) {
    return (
        <>
            {content}
            <LoadingDots />
        </>
    );
}
