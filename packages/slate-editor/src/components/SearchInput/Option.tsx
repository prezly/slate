import classNames from 'classnames';
import React, { type HTMLAttributes } from 'react';

import styles from './Option.module.scss';

interface Props extends HTMLAttributes<HTMLDivElement> {
    active?: boolean;
    disabled?: boolean;
}

export function Option({ active, children, className, disabled }: Props) {
    return (
        <div
            className={classNames(className, styles.Option, {
                [styles.active]: active,
                [styles.disabled]: disabled,
            })}
        >
            {children}
        </div>
    );
}
