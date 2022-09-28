import type { ReactNode } from 'react';
import React from 'react';

import styles from './Suggestions.module.scss';

export interface Props {
    children?: ReactNode;
    footer?: ReactNode;
}
export function Suggestions({ children, footer }: Props) {
    return (
        <div className={styles.Suggestions}>
            {children}
            {footer && <div className={styles.Footer}>{footer}</div>}
        </div>
    );
}
