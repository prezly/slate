import classNames from 'classnames';
import type { ReactNode } from 'react';
import React from 'react';

import styles from './KeyboardKey.module.scss';

interface Props {
    children: ReactNode;
    className?: string;
}

export function KeyboardKey({ children, className }: Props) {
    return <kbd className={classNames(styles.KeyboardKey, className)}>{children}</kbd>;
}
