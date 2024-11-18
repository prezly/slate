import type { SlateEditor } from '@udecode/plate-common';
import { toDOMRange } from '@udecode/slate-react';
import type { Range } from 'slate';

/**
 * Type-safe wrapper for `ReactEditor.toDOMRange`
 */
export function toDomRange(editor: SlateEditor, range: Range): globalThis.Range | null {
    try {
        // "Slate throws exceptions too liberally in relation to selection failures"
        // see: https://app.clubhouse.io/prezly/story/20456/error-cannot-resolve-a-dom-node-from-slate-node-text
        // see: https://github.com/ianstormtaylor/slate/issues/3641
        return toDOMRange(editor, range) ?? null;
    } catch {
        return null;
    }
}
