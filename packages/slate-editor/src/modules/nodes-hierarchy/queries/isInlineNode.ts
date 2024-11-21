import { isLinkNode, isMentionNode, isVariableNode } from '@prezly/slate-types';
import { isText, type TNode } from '@udecode/plate-common';

export function isInlineNode(node: TNode) {
    return isText(node) || isLinkNode(node) || isMentionNode(node) || isVariableNode(node);
}
