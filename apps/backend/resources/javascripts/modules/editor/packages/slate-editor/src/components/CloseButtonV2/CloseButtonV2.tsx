import classNames from 'classnames';
import type { FunctionComponent } from 'react';
import React from 'react';

import { Cross } from '#icons';

import styles from './CloseButtonV2.module.scss';

interface Props {
    className?: string;
    disabled?: boolean;
    onClick: () => void;
    title: string;
}

export const CloseButtonV2: FunctionComponent<Props> = ({
    className,
    disabled,
    onClick,
    title,
}) => (
    <button
        className={classNames('btn', 'btn-default', styles['close-button'], className)}
        disabled={disabled}
        onClick={onClick}
        title={title}
        type="button"
    >
        <Cross height={16} width={16} />
    </button>
);
