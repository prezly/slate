import classNames from 'classnames';
import React, { type HTMLAttributes } from 'react';

import styles from './Option.module.scss';

export interface Props extends HTMLAttributes<HTMLDivElement> {
    active?: boolean;
    disabled?: boolean;
    onSelect: () => void;
}

export function Option({
    active,
    children,
    className,
    disabled,
    onClick,
    onSelect,
    ...attributes
}: Props) {
    return (
        <div
            role="button"
            {...attributes}
            className={classNames(className, styles.Option, {
                [styles.active]: active,
                [styles.disabled]: disabled,
            })}
            onClick={(event) => {
                onClick?.(event);
                onSelect();
            }}
        >
            {children}
        </div>
    );
}
