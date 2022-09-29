import classNames from 'classnames';
import type { Ref } from 'react';
import React, { type HTMLAttributes } from 'react';

import styles from './Option.module.scss';
import type { Props, Suggestion } from './types';

export interface Props<T> extends HTMLAttributes<HTMLDivElement> {
    forwardRef?: Ref<HTMLElement>;
    active?: boolean;
    disabled?: boolean;
    suggestion: Suggestion<T>;
}

export function Option<T>({
    forwardRef,
    suggestion,
    active = false,
    children,
    className,
    disabled = false,
    ...attributes
}: Props<T>) {
    return (
        <div
            ref={forwardRef as Ref<HTMLDivElement>}
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
