import ElementNode, { isElementNode } from './ElementNode';
import TextNode, { isTextNode } from './TextNode';

export const PLACEHOLDER_NODE_TYPE = 'placeholder';

export default interface PlaceholderNode extends ElementNode<typeof PLACEHOLDER_NODE_TYPE> {
    children: TextNode[];
    key:
        | 'contact.firstname'
        | 'contact.fullname'
        | 'contact.lastname'
        | 'contact.salutation'
        | 'publication.date'
        | 'release.shorturl'
        | 'release.url';
}

export const isPlaceholderNode = (value: any): value is PlaceholderNode => {
    return (
        isElementNode(value) &&
        value.type === PLACEHOLDER_NODE_TYPE &&
        typeof value.key === 'string' &&
        value.key.length > 0 &&
        Array.isArray(value.children) &&
        value.children.every(isTextNode)
    );
};
