import { isListNode, isParagraphNode } from '@prezly/slate-types';
import type { NodeEntry } from 'slate';

export function isAllowedInTableCell([node]: NodeEntry) {
    return isParagraphNode(node) || isListNode(node);
}
