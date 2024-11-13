import type { SlateEditor } from '@udecode/plate-common';
import { toDOMNode } from '@udecode/slate-react';
import type { Node } from 'slate';

/**
 * Type-safe wrapper for `ReactEditor.toDOMNode`
 */
export function toDomNode(editor: SlateEditor, node: Node): HTMLElement | null {
    try {
        // "Slate throws exceptions too liberally in relation to selection failures"
        // see: https://app.clubhouse.io/prezly/story/20456/error-cannot-resolve-a-dom-node-from-slate-node-text
        // see: https://github.com/ianstormtaylor/slate/issues/3641
        // @ts-expect-error TODO: Fix this
        return toDOMNode(editor, node);
    } catch {
        return null;
    }
}
