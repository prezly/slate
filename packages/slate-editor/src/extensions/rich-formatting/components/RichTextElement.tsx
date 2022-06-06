import type { FunctionComponent, HTMLAttributes } from 'react';
import React from 'react';
import type { RenderElementProps } from 'slate-react';

import type { RichTextElementType } from '../types';
import { ElementType } from '../types';

import { ListElement, ListItemElement, ListItemTextElement } from './Lists';

interface Props extends HTMLAttributes<HTMLElement> {
    attributes?: RenderElementProps['attributes'];
    element: RichTextElementType;
}

export const RichTextElement: FunctionComponent<Props> = ({
    attributes,
    children,
    element,
    ...props
}) => {
    switch (element.type) {
        case ElementType.BULLETED_LIST:
        case ElementType.NUMBERED_LIST:
            return (
                <ListElement {...props} attributes={attributes} element={element}>
                    {children}
                </ListElement>
            );
        case ElementType.LIST_ITEM:
            return (
                <ListItemElement {...props} attributes={attributes} element={element}>
                    {children}
                </ListItemElement>
            );
        case ElementType.LIST_ITEM_TEXT:
            return (
                <ListItemTextElement {...props} attributes={attributes} element={element}>
                    {children}
                </ListItemTextElement>
            );
        default:
            return null;
    }
};
