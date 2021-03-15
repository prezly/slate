import classNames from 'classnames';
import React, { FunctionComponent, HTMLAttributes } from 'react';
import { RenderElementProps } from 'slate-react';

import { ElementType, RichTextElementType } from '../../types';

interface Props extends HTMLAttributes<HTMLDivElement> {
    attributes?: RenderElementProps['attributes'];
    element: RichTextElementType;
}

const ListItemTextElement: FunctionComponent<Props> = ({
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

export default ListItemTextElement;
