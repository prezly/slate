import type { ListItemTextNode } from '@prezly/slate-types';
import classNames from 'classnames';
import type { HTMLAttributes } from 'react';
import React from 'react';

import styles from './ListItemTextElement.module.scss';

interface Props extends HTMLAttributes<HTMLDivElement> {
    element: ListItemTextNode;
}

export function ListItemTextElement({ children, className, ...props }: Props) {
    return (
        <span {...props} className={classNames(styles.ListItemTextElement, className)}>
            {children}
        </span>
    );
}
