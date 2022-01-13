import type { ElementNode } from './ElementNode';
import { isElementNode } from './ElementNode';
import type { Alignable } from './interfaces';

export const HEADING_1_NODE_TYPE = 'heading-one';
export const HEADING_2_NODE_TYPE = 'heading-two';

export interface HeadingNode extends ElementNode, Alignable {
    type: typeof HEADING_1_NODE_TYPE | typeof HEADING_2_NODE_TYPE;
}

export function isHeadingNode(value: any): value is HeadingNode {
    return isElementNode<HeadingNode>(value, [HEADING_1_NODE_TYPE, HEADING_2_NODE_TYPE]);
}
