import { ElementNode, isElementNode } from './ElementNode';

export const PLACEHOLDER_NODE_TYPE = 'placeholder';

export interface PlaceholderNode extends ElementNode {
    type: typeof PLACEHOLDER_NODE_TYPE;
    key: string;
}

export const isPlaceholderNode = (value: any): value is PlaceholderNode =>
    isElementNode<PlaceholderNode>(value, PLACEHOLDER_NODE_TYPE);
