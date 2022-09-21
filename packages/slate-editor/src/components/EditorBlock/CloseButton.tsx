import classNames from 'classnames';
import React, { type ButtonHTMLAttributes } from 'react';

import { Cross } from '#icons';

import styles from './CloseButton.module.scss';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    onClick?: () => void;
}

export function CloseButton({ className, ...props }: Props) {
    return (
        <button {...props} className={classNames(styles.CloseButton, className)}>
            <Cross className={styles.Icon} />
        </button>
    );
}
