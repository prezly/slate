import classNames from 'classnames';
import type { MouseEventHandler } from 'react';
import React, { type ButtonHTMLAttributes } from 'react';

import { Cross } from '#icons';
import { useFunction } from '#lib';

import styles from './CloseButton.module.scss';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    onClick?: () => void;
}

export function CloseButton({ className, onClick, ...props }: Props) {
    const handleClick = useFunction<MouseEventHandler<HTMLButtonElement>>((event) => {
        event.preventDefault();
        event.stopPropagation();
        onClick?.();
    });
    return (
        <button
            {...props}
            onClick={onClick ? handleClick : undefined}
            className={classNames(styles.CloseButton, className)}
        >
            <Cross className={styles.Icon} />
        </button>
    );
}
