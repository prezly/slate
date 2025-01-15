import { RangeApi, type SlateEditor } from '@udecode/plate';

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

    return RangeApi.includes(editorRange, editor.selection);
}
