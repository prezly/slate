import type { ElementNode } from './ElementNode';
import { isElementNode } from './ElementNode';
import type { TextNode } from './TextNode';

export const LINK_NODE_TYPE = 'link';

export interface LinkNode extends ElementNode {
    type: typeof LINK_NODE_TYPE;
    href: string;
    new_tab: boolean;
    children: TextNode[];
}

export function isLinkNode(value: any): value is LinkNode {
    return isElementNode<LinkNode>(value, LINK_NODE_TYPE);
}
