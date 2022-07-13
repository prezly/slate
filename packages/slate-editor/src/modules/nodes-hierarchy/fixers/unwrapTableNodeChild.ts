import {
    isHeadingNode,
    isQuoteNode,
    isTableCellNode,
    isTableNode,
    isTableRowNode,
} from '@prezly/slate-types';
import type { NodeEntry, Editor } from 'slate';
import type { Node } from 'slate';

import { unwrapNode } from './unwrapNode';

export function unwrapTableNodeChild(editor: Editor, entry: NodeEntry) {
    return unwrapNode(editor, entry, ([node]) => canUnwrapNode(node));
}

function canUnwrapNode(node: Node) {
    return (
        isHeadingNode(node) ||
        isQuoteNode(node) ||
        isTableNode(node) ||
        isTableRowNode(node) ||
        isTableCellNode(node)
    );
}
