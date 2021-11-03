import { Element } from 'slate';

import ElementNode from './ElementNode';

export const PLACEHOLDER_NODE_TYPE = 'placeholder';

export default interface PlaceholderNode extends ElementNode {
    type: typeof PLACEHOLDER_NODE_TYPE;
    key: string;
}

export const isPlaceholderNode = (value: any): value is PlaceholderNode =>
    Element.isElementType(value, PLACEHOLDER_NODE_TYPE);
