import { ElementNode, isElementNode } from './ElementNode';
import { TextNode } from './TextNode';

export const LINK_NODE_TYPE = 'link';

export interface LinkNode extends ElementNode {
    type: typeof LINK_NODE_TYPE;
    children: TextNode[];
    href: string;
}

export const isLinkNode = (value: any): value is LinkNode =>
    isElementNode<LinkNode>(value, LINK_NODE_TYPE);
