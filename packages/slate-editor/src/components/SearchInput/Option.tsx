import classNames from 'classnames';
import React, { type HTMLAttributes } from 'react';

import styles from './Option.module.scss';
import type { Props, Suggestion } from './types';

export interface Props<T> extends HTMLAttributes<HTMLDivElement> {
    active?: boolean;
    disabled?: boolean;
    suggestion: Suggestion<T>;
}

export function Option<T>({
    suggestion,
    active = false,
    children,
    className,
    disabled = false,
    ...attributes
}: Props<T>) {
    return (
        <div
            role="button"
            {...attributes}
            className={classNames(className, styles.Option, {
                [styles.active]: active,
                [styles.disabled]: disabled || suggestion.disabled,
            })}
        >
            {children}
        </div>
    );
}
