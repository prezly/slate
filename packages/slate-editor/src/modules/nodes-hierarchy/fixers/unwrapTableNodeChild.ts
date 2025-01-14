import {
    isHeadingNode,
    isQuoteNode,
    isTableCellNode,
    isTableNode,
    isTableRowNode,
} from '@prezly/slate-types';
import type { SlateEditor, TNode, TNodeEntry } from '@udecode/plate-common';

import { unwrapNode } from './unwrapNode';

export function unwrapTableNodeChild(editor: SlateEditor, entry: TNodeEntry) {
    return unwrapNode(editor, entry, ([node]) => canUnwrapNode(node));
}

function canUnwrapNode(node: TNode) {
    return (
        isHeadingNode(node) ||
        isQuoteNode(node) ||
        isTableNode(node) ||
        isTableRowNode(node) ||
        isTableCellNode(node)
    );
}
