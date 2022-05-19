import classNames from 'classnames';
import React from 'react';

import styles from './LoadingPlaceholderV2.module.scss';

export interface Props {
    className?: string;
    percent: string;
}

export function ProgressBar({ className, percent }: Props) {
    return (
        <div className={classNames(styles.ProgressBar, className)}>
            <div className={styles.ProgressBarValue} style={{ width: percent }} />
        </div>
    );
}
