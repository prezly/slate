import type { Range } from 'slate';
import { ReactEditor } from 'slate-react';

/**
 * Type-safe wrapper for `ReactEditor.toDOMRange`
 */
const toDomRange = (editor: ReactEditor, range: Range): globalThis.Range | null => {
    try {
        // "Slate throws exceptions too liberally in relation to selection failures"
        // see: https://app.clubhouse.io/prezly/story/20456/error-cannot-resolve-a-dom-node-from-slate-node-text
        // see: https://github.com/ianstormtaylor/slate/issues/3641
        return ReactEditor.toDOMRange(editor, range);
    } catch {
        return null;
    }
};

export default toDomRange;
