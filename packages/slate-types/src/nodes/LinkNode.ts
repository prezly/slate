import ElementNode, { isElementNode } from './ElementNode';
import TextNode, { isTextNode } from './TextNode';

export const LINK_NODE_TYPE = 'link';

export default interface LinkNode extends ElementNode<typeof LINK_NODE_TYPE> {
    children: TextNode[];
    href: string;
}

export const isLinkNode = (value: any): value is LinkNode => {
    return (
        isElementNode(value) &&
        value.type === LINK_NODE_TYPE &&
        typeof value.href === 'string' &&
        value.href.length > 0 &&
        Array.isArray(value.children) &&
        value.children.every(isTextNode)
    );
};
