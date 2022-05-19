import classNames from 'classnames';
import React from 'react';

import styles from './LoadingPlaceholderV2.module.scss';

export interface Props {
    children: string;
    className?: string;
    percent: string;
}

export function Description({ children, className, percent }: Props) {
    return (
        <div className={classNames(styles.Description, className)}>
            <span className={styles.Message}>{children}...</span>
            <span className={styles.Progress}>{percent}</span>
        </div>
    );
}
