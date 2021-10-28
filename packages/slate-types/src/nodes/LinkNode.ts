import { Element } from 'slate';

import TextNode from './TextNode';

export const LINK_NODE_TYPE = 'link';

export default interface LinkNode extends Element {
    type: typeof LINK_NODE_TYPE;
    children: TextNode[];
    href: string;
}

export const isLinkNode = (value: any): value is LinkNode =>
    Element.isElementType(value, LINK_NODE_TYPE);
