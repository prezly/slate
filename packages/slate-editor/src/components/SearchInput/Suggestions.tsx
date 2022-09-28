import type { ReactNode } from 'react';
import React from 'react';

import styles from './SearchInput.module.scss';

export interface Props {
    children?: ReactNode;
}
export function Suggestions({ children }: Props) {
    return <div className={styles.Suggestions}>{children}</div>;
}
