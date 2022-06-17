import type { ListItemTextNode } from '@prezly/slate-types';
import classNames from 'classnames';
import type { HTMLAttributes } from 'react';
import React, { forwardRef } from 'react';

import styles from './ListItemTextElement.module.scss';

interface Props extends HTMLAttributes<HTMLSpanElement> {
    element: ListItemTextNode;
}

export const ListItemTextElement = forwardRef<HTMLSpanElement, Props>(
    ({ children, className, ...props }, ref) => {
        return (
            <span {...props} className={classNames(styles.ListItemTextElement, className)} ref={ref}>
                {children}
            </span>
        );
    },
);

ListItemTextElement.displayName = 'ListItemTextElement';
