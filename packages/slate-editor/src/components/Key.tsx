import classNames from 'classnames';
import type { ReactNode } from 'react';
import React from 'react';

import styles from './Key.module.scss';

interface Props {
    children: ReactNode;
    className?: string;
}

export function Key({ children, className }: Props) {
    return <kbd className={classNames(styles.Key, className)}>{children}</kbd>;
}
