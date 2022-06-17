import { isLinkNode, isMentionNode, isPlaceholderNode } from '@prezly/slate-types';
import { Text } from 'slate';
import type { NodeEntry } from 'slate';

export function isInlineContent([node]: NodeEntry) {
    return Text.isText(node) || isLinkNode(node) || isMentionNode(node) || isPlaceholderNode(node);
}
