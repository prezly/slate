import classNames from 'classnames';
import type { ReactNode } from 'react';
import React from 'react';

import styles from './Menu.module.scss';

export interface Props {
    children: ReactNode;
    className?: string;
}

export function Toolbar({ children, className }: Props) {
    return (
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
        <div
            className={classNames(styles.Toolbar, className)}
            onMouseDown={(event) => event.preventDefault()}
        >
            {children}
        </div>
    );
}
