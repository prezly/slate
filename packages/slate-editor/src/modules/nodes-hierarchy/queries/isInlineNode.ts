import { isLinkNode, isMentionNode, isVariableNode } from '@prezly/slate-types';
import { Text } from 'slate';
import type { Node } from 'slate';

export function isInlineNode(node: Node) {
    return Text.isText(node) || isLinkNode(node) || isMentionNode(node) || isVariableNode(node);
}
