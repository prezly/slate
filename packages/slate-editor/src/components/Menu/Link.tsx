import classNames from 'classnames';
import type { AnchorHTMLAttributes } from 'react';
import React from 'react';

import styles from './Menu.module.scss';

export interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {
    className?: string;
    disabled?: boolean;
}

export function Link({ children, className, disabled, ...props }: Props) {
    return (
        <a
            {...props}
            className={classNames(styles.Link, className, {
                [styles.disabled]: disabled,
            })}
        >
            {children}
        </a>
    );
}
