import type { ElementNode } from './ElementNode';
import { isElementNode } from './ElementNode';

export const PLACEHOLDER_NODE_TYPE = 'placeholder';

export interface PlaceholderNode extends ElementNode {
    type: typeof PLACEHOLDER_NODE_TYPE;
    key: string;
}

export function isPlaceholderNode(value: any): value is PlaceholderNode {
    return isElementNode<PlaceholderNode>(value, PLACEHOLDER_NODE_TYPE);
}
