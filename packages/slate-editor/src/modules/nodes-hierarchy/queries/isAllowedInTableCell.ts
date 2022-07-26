import { isListNode, isParagraphNode } from '@prezly/slate-types';
import type { Node } from 'slate';

export function isAllowedInTableCell(node: Node) {
    return isParagraphNode(node) || isListNode(node);
}
