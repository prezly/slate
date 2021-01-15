import ElementNode, { isElementNode } from './ElementNode';

export const DIVIDER_NODE_TYPE = 'divider';

export default interface DividerNode extends ElementNode {
    type: typeof DIVIDER_NODE_TYPE;
}

export const isDividerNode = (value: any): value is DividerNode =>
    isElementNode(value) && value.type === DIVIDER_NODE_TYPE;
