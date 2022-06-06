import type { ListItemNode } from '@prezly/slate-types';
import classNames from 'classnames';
import type { HTMLAttributes } from 'react';
import React from 'react';

import styles from './ListItemElement.module.scss';

interface Props extends HTMLAttributes<HTMLLIElement> {
    element: ListItemNode;
}

export function ListItemElement({ children, className, ...props }: Props) {
    return (
        <li {...props} className={classNames(styles.ListItemElement, className)}>
            {children}
        </li>
    );
}
