import classNames from 'classnames';
import type { ButtonHTMLAttributes, MouseEventHandler } from 'react';
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
    onClick,
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
            onClick={leftClickOnly(onClick)}
            {...props}
        />
    );
}

function leftClickOnly(
    handler: MouseEventHandler<HTMLButtonElement> | undefined,
): MouseEventHandler<HTMLButtonElement> | undefined {
    if (handler) {
        return (event) => {
            if (event.button === 0) {
                handler(event);
            }
        };
    }
    return undefined;
}
