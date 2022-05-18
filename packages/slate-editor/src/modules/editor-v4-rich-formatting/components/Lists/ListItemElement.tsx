import type { ListItemNode } from '@prezly/slate-types';
import classNames from 'classnames';
import type { HTMLAttributes } from 'react';
import React from 'react';
import type { RenderElementProps } from 'slate-react';

import { ElementType } from '../../types';

import styles from './Lists.module.scss';

interface Props extends HTMLAttributes<HTMLLIElement> {
    attributes?: RenderElementProps['attributes'];
    element: ListItemNode;
}

export function ListItemElement({ attributes, children, className, element, ...props }: Props) {
    return (
        <li
            {...attributes}
            {...props}
            className={classNames(styles.ListItemElement, className)}
            data-slate-type={ElementType.LIST_ITEM}
            data-slate-value={JSON.stringify(element)}
        >
            {children}
        </li>
    );
}
