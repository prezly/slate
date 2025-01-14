import { isListNode, isParagraphNode } from '@prezly/slate-types';
import type { TNode } from '@udecode/plate-common';

export function isAllowedInTableCell(node: TNode) {
    return isParagraphNode(node) || isListNode(node);
}
