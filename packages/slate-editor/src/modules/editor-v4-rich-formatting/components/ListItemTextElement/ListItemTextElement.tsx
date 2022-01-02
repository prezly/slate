import classNames from 'classnames';
import type { FunctionComponent, HTMLAttributes } from 'react';
import React from 'react';
import type { RenderElementProps } from 'slate-react';

import type { RichTextElementType } from '../../types';
import { ElementType } from '../../types';

import './ListItemTextElement.scss';

interface Props extends HTMLAttributes<HTMLDivElement> {
    attributes?: RenderElementProps['attributes'];
    element: RichTextElementType;
}

export const ListItemTextElement: FunctionComponent<Props> = ({
    attributes,
    children,
    className,
    element,
    ...props
}) => (
    <div
        {...attributes}
        {...props}
        className={classNames('editor-v4-list-item-text-element', className)}
        data-slate-type={ElementType.LIST_ITEM_TEXT}
        data-slate-value={JSON.stringify(element)}
    >
        {children}
    </div>
);

