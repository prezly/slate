import classNames from 'classnames';
import type { ButtonHTMLAttributes } from 'react';
import React from 'react';

import styles from './Menu.module.scss';

export interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    active?: boolean;
    variant?: 'default' | 'primary' | 'success' | 'danger';
}

export function Button({
    active,
    className,
    type = 'button',
    variant = 'default',
    ...props
}: Props) {
    return (
        <button
            className={classNames(styles.Button, className, {
                [styles.danger]: variant === 'danger',
                [styles.primary]: variant === 'primary',
                [styles.success]: variant === 'success',
                [styles.active]: active,
            })}
            // eslint-disable-next-line react/button-has-type
            type={type}
            {...props}
        />
    );
}
