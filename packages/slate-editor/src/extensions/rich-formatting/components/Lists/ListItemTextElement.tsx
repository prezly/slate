import type { ListItemTextNode } from '@prezly/slate-types';
import classNames from 'classnames';
import type { HTMLAttributes } from 'react';
import React from 'react';
import type { RenderElementProps } from 'slate-react';

import styles from './ListItemTextElement.module.scss';

interface Props extends HTMLAttributes<HTMLDivElement> {
    attributes?: RenderElementProps['attributes'];
    element: ListItemTextNode;
}

export function ListItemTextElement({ attributes, children, className, ...props }: Props) {
    return (
        <span
            {...attributes}
            {...props}
            className={classNames(styles.ListItemTextElement, className)}
        >
            {children}
        </span>
    );
}
