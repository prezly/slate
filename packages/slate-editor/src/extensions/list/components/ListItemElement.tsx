import type { ListItemNode } from '@prezly/slate-types';
import classNames from 'classnames';
import type { HTMLAttributes } from 'react';
import React, { forwardRef } from 'react';

import styles from './ListItemElement.module.scss';

interface Props extends HTMLAttributes<HTMLLIElement> {
    element: ListItemNode;
}

export const ListItemElement = forwardRef<HTMLLIElement, Props>(
    ({ children, className, ...props }, ref) => {
        return (
            <li {...props} className={classNames(styles.ListItemElement, className)} ref={ref}>
                {children}
            </li>
        );
    },
);

ListItemElement.displayName = 'ListItemElement';
