import type { ListItemNode } from '@prezly/slate-types';
import classNames from 'classnames';
import type { HTMLAttributes } from 'react';
import React from 'react';
import type { RenderElementProps } from 'slate-react';

import styles from './ListItemElement.module.scss';

interface Props extends HTMLAttributes<HTMLLIElement> {
    attributes?: RenderElementProps['attributes'];
    element: ListItemNode;
}

export function ListItemElement({ attributes, children, className, ...props }: Props) {
    return (
        <li {...attributes} {...props} className={classNames(styles.ListItemElement, className)}>
            {children}
        </li>
    );
}
