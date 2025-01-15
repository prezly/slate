import { EditorCommands } from '@prezly/slate-commons';
import type { QuoteNode } from '@prezly/slate-types';
import { isQuoteNode } from '@prezly/slate-types';
import type { NodeEntry, SlateEditor } from '@udecode/plate';

const shape: Record<keyof QuoteNode, true> = {
    type: true,
    align: true,
    children: true,
};

const ALLOWED_ATTRIBUTES = Object.keys(shape);

export function normalizeRedundantAttributes(
    editor: SlateEditor,
    [node, path]: NodeEntry,
): boolean {
    if (isQuoteNode(node)) {
        return EditorCommands.normalizeRedundantAttributes(
            editor,
            [node, path],
            ALLOWED_ATTRIBUTES,
        );
    }

    return false;
}
