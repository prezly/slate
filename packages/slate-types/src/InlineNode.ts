import LinkNode, { isLinkNode } from './LinkNode';
import MentionNode, { isMentionNode } from './MentionNode';
import PlaceholderNode, { isPlaceholderNode } from './PlaceholderNode';
import TextNode, { isTextNode } from './TextNode';

type InlineNode = LinkNode | MentionNode | PlaceholderNode | TextNode;

export const isInlineNode = (value: any): value is InlineNode => {
    return (
        isLinkNode(value) || isMentionNode(value) || isPlaceholderNode(value) || isTextNode(value)
    );
};

export default InlineNode;
