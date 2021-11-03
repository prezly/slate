import { Element } from 'slate';

import ElementNode from './ElementNode';

export const HEADING_1_NODE_TYPE = 'heading-one';
export const HEADING_2_NODE_TYPE = 'heading-two';

export default interface HeadingNode extends ElementNode {
    type: typeof HEADING_1_NODE_TYPE | typeof HEADING_2_NODE_TYPE;
}

export const isHeadingNode = (value: any): value is HeadingNode =>
    Element.isElementType(value, HEADING_1_NODE_TYPE) ||
    Element.isElementType(value, HEADING_2_NODE_TYPE);
