import classNames from 'classnames';
import type { FunctionComponent, HTMLAttributes } from 'react';
import React from 'react';
import type { RenderElementProps } from 'slate-react';

import type { RichTextElementType } from '../../types';
import { ElementType } from '../../types';

import './ListItemElement.scss';

interface Props extends HTMLAttributes<HTMLLIElement> {
    attributes?: RenderElementProps['attributes'];
    element: RichTextElementType;
}

export const ListItemElement: FunctionComponent<Props> = ({
    attributes,
    children,
    className,
    element,
    ...props
}) => (
    <li
        {...attributes}
        {...props}
        className={classNames('editor-v4-list-item-element', className)}
        data-slate-type={ElementType.LIST_ITEM}
        data-slate-value={JSON.stringify(element)}
    >
        {children}
    </li>
);
