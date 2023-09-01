import classNames from 'classnames';
import type { Ref } from 'react';
import React, { type ReactNode } from 'react';

import styles from './BookmarkCard.module.scss';

interface Props {
    border: boolean;
    children: ReactNode;
    forwardRef?: Ref<HTMLDivElement>;
    layout: 'vertical' | 'horizontal';
}

export function Container({ border = true, layout, children, forwardRef }: Props) {
    return (
        <div
            className={classNames(styles.container, {
                [styles.border]: border,
                [styles.vertical]: layout === 'vertical',
                [styles.horizontal]: layout === 'horizontal',
            })}
            ref={forwardRef}
        >
            {children}
        </div>
    );
}
