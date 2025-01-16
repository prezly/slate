import type { SlateEditor } from '@udecode/plate-common';
import { Range } from 'slate';

import { getEditorRange } from './getEditorRange';

/**
 * This function exists only because of the following issue:
 * https://github.com/ianstormtaylor/slate/issues/3878
 */
export function isSelectionValid(editor: SlateEditor): boolean {
    if (!editor.selection) {
        return false;
    }

    const editorRange = getEditorRange(editor);

    if (!editorRange) {
        return false;
    }

    return Range.includes(editorRange, editor.selection);
}
