import type { ElementNode } from './ElementNode';
import { isElementNode } from './ElementNode';

export const DIVIDER_NODE_TYPE = 'divider';

export interface DividerNode extends ElementNode {
    type: typeof DIVIDER_NODE_TYPE;
}

export function isDividerNode(value: any): value is DividerNode {
    return isElementNode<DividerNode>(value, DIVIDER_NODE_TYPE);
}
