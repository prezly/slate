import { EmailPlaceholderKey, StoryPlaceholderKey } from '@prezly/slate-types';

import LinkNode, { isLinkNode, LINK_NODE_TYPE } from './LinkNode';
import MentionNode, { isMentionNode, MENTION_NODE_TYPE } from './MentionNode';
import PlaceholderNode, { isPlaceholderNode, PLACEHOLDER_NODE_TYPE } from './PlaceholderNode';

export const INLINE_NODE_TYPES = [LINK_NODE_TYPE, MENTION_NODE_TYPE, PLACEHOLDER_NODE_TYPE];

type InlineNode =
    | LinkNode
    | MentionNode
    | PlaceholderNode<EmailPlaceholderKey>
    | PlaceholderNode<StoryPlaceholderKey>;

export const isInlineNode = (value: any): value is InlineNode => {
    return isLinkNode(value) || isMentionNode(value) || isPlaceholderNode(value);
};

export default InlineNode;
