import classNames from 'classnames';
import React, { type HTMLAttributes } from 'react';

import styles from './EntryPoint.module.scss';

interface Props extends HTMLAttributes<HTMLElement> {
    title?: string;
}

export function EntryPoint({
    className,
    title = 'Click to insert a new paragraph',
    ...props
}: Props) {
    return (
        <div
            {...props}
            className={classNames(className, styles.EntryPoint)}
            contentEditable={false}
            role="button"
            title={title}
        >
            {title}
        </div>
    );
}
