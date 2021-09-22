import { PlaceholderKey } from '../sdk';

import LinkNode, { isLinkNode, LINK_NODE_TYPE } from './LinkNode';
import MentionNode, { isMentionNode, MENTION_NODE_TYPE } from './MentionNode';
import PlaceholderNode, { isPlaceholderNode, PLACEHOLDER_NODE_TYPE } from './PlaceholderNode';

export const INLINE_NODE_TYPES = [LINK_NODE_TYPE, MENTION_NODE_TYPE, PLACEHOLDER_NODE_TYPE];

type InlineNode<Key extends string = PlaceholderKey> =
    | LinkNode
    | MentionNode
    | PlaceholderNode<Key>;

export const isInlineNode = <Key extends string = PlaceholderKey>(
    value: any,
): value is InlineNode<Key> => {
    return isLinkNode(value) || isMentionNode(value) || isPlaceholderNode(value);
};

export default InlineNode;
