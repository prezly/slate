import { Element } from 'slate';

export const PLACEHOLDER_NODE_TYPE = 'placeholder';

export default interface PlaceholderNode extends Element {
    type: typeof PLACEHOLDER_NODE_TYPE;
    key: string;
}

export const isPlaceholderNode = (value: any): value is PlaceholderNode =>
    Element.isElementType(value, PLACEHOLDER_NODE_TYPE);
