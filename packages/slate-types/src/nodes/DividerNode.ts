import { Element } from 'slate';

import ElementNode from './ElementNode';

export const DIVIDER_NODE_TYPE = 'divider';

export default interface DividerNode extends ElementNode {
    type: typeof DIVIDER_NODE_TYPE;
}

export const isDividerNode = (value: any): value is DividerNode =>
    Element.isElementType<DividerNode>(value, DIVIDER_NODE_TYPE);
