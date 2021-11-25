import type { FunctionComponent, HTMLAttributes } from 'react';
import React from 'react';
import type { RenderElementProps } from 'slate-react';

import type { RichTextElementType } from '../types';
import { ElementType } from '../types';

import BlockQuoteElement from './BlockQuoteElement';
import BulletedListElement from './BulletedListElement';
import HeadingOneElement from './HeadingOneElement';
import HeadingTwoElement from './HeadingTwoElement';
import ListItemElement from './ListItemElement';
import ListItemTextElement from './ListItemTextElement';
import NumberedListElement from './NumberedListElement';

interface Props extends HTMLAttributes<HTMLElement> {
    attributes?: RenderElementProps['attributes'];
    element: RichTextElementType;
}

const RichTextElement: FunctionComponent<Props> = ({ attributes, children, element, ...props }) => {
    switch (element.type) {
        case ElementType.BLOCK_QUOTE:
            return (
                <BlockQuoteElement {...props} attributes={attributes} element={element}>
                    {children}
                </BlockQuoteElement>
            );
        case ElementType.BULLETED_LIST:
            return (
                <BulletedListElement {...props} attributes={attributes} element={element}>
                    {children}
                </BulletedListElement>
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
        case ElementType.NUMBERED_LIST:
            return (
                <NumberedListElement {...props} attributes={attributes} element={element}>
                    {children}
                </NumberedListElement>
            );
        default:
            return null;
    }
};

export default RichTextElement;
