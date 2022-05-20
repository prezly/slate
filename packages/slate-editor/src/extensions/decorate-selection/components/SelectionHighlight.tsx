import type { ReactNode } from 'react';
import React from 'react';

import styles from './SelectionHighlight.module.scss';

interface Props {
    children: ReactNode;
}

export function SelectionHighlight({ children }: Props) {
    return <span className={styles.selection}>{children}</span>;
}
