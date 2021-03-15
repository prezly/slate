import classNames from 'classnames';
import React, { FunctionComponent, HTMLAttributes } from 'react';
import { RenderElementProps } from 'slate-react';

import { ElementType, RichTextElementType } from '../../types';

interface Props extends HTMLAttributes<HTMLLIElement> {
    attributes?: RenderElementProps['attributes'];
    element: RichTextElementType;
}

const ListItemElement: FunctionComponent<Props> = ({
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

export default ListItemElement;
