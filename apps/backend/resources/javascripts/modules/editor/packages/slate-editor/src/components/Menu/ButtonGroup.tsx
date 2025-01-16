import classNames from 'classnames';
import type { ReactNode } from 'react';
import React from 'react';

import styles from './Menu.module.scss';

export interface Props {
    children: ReactNode;
    flex?: boolean;
}

export function ButtonGroup({ children, flex }: Props) {
    return (
        <div
            className={classNames(styles.ButtonGroup, {
                [styles.flex]: flex,
            })}
        >
            {children}
        </div>
    );
}
