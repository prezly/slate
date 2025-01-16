import { isLinkNode, isMentionNode, isVariableNode } from '@prezly/slate-types';
import { TextApi, type TNode } from '@udecode/plate';

export function isInlineNode(node: TNode) {
    return TextApi.isText(node) || isLinkNode(node) || isMentionNode(node) || isVariableNode(node);
}
