import type { FunctionComponent, HTMLAttributes } from 'react';
import React from 'react';
import type { RenderElementProps } from 'slate-react';

import type { RichTextElementType } from '../types';
import { ElementType } from '../types';

import { BlockQuoteElement } from './BlockQuoteElement';
import { HeadingOneElement } from './HeadingOneElement';
import { HeadingTwoElement } from './HeadingTwoElement';
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
        case ElementType.BLOCK_QUOTE:
            return (
                <BlockQuoteElement {...props} attributes={attributes} element={element}>
                    {children}
                </BlockQuoteElement>
            );
        case ElementType.HEADING_ONE:
            return (
                <HeadingOneElement {...props} attributes={attributes} element={element}>
                    {children}
                </HeadingOneElement>
            );
        case ElementType.HEADING_TWO:
            return (
                <HeadingTwoElement {...props} attributes={attributes} element={element}>
                    {children}
                </HeadingTwoElement>
            );
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
