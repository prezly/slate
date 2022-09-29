import classNames from 'classnames';
import React, { type HTMLAttributes } from 'react';

import styles from './Option.module.scss';
import type { Props } from './types';

export type Props<T> = Props.Option<T> & HTMLAttributes<HTMLDivElement>;

export function Option<T>({
    id, // eslint-disable-line no-unused-vars,@typescript-eslint/no-unused-vars
    value, // eslint-disable-line no-unused-vars,@typescript-eslint/no-unused-vars
    active,
    children,
    className,
    disabled,
    onClick,
    onSelect,
    ...attributes
}: Props<T>) {
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
