import classNames from 'classnames';
import type { Ref } from 'react';
import React, { type HTMLAttributes } from 'react';

import styles from './Option.module.scss';

export interface Props extends HTMLAttributes<HTMLDivElement> {
    forwardRef?: Ref<HTMLElement>;
    active?: boolean;
    disabled?: boolean;
}

export function Option({
    forwardRef,
    active = false,
    children,
    className,
    disabled = false,
    ...attributes
}: Props) {
    return (
        <div
            ref={forwardRef as Ref<HTMLDivElement>}
            role="button"
            {...attributes}
            className={classNames(className, styles.Option, {
                [styles.active]: active,
                [styles.disabled]: disabled,
            })}
        >
            {children}
        </div>
    );
}
