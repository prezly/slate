import type { ListItemTextNode } from '@prezly/slate-types';
import classNames from 'classnames';
import type { HTMLAttributes } from 'react';
import React from 'react';
import type { RenderElementProps } from 'slate-react';

import { ElementType } from '../../types';

import styles from './Lists.module.scss';

interface Props extends HTMLAttributes<HTMLDivElement> {
    attributes?: RenderElementProps['attributes'];
    element: ListItemTextNode;
}

export function ListItemTextElement({ attributes, children, className, element, ...props }: Props) {
    return (
        <span
            {...attributes}
            {...props}
            className={classNames(styles.ListItemTextElement, className)}
            data-slate-type={ElementType.LIST_ITEM_TEXT}
            data-slate-value={JSON.stringify(element)}
        >
            {children}
        </span>
    );
}
