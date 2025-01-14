import type { SlateEditor } from '@udecode/plate-common';
import type { Location } from 'slate';

/**
 * See {@link SlateEditor.string}.
 * If `at` is `null`, return an empty string.
 */
export function getText(editor: SlateEditor, at: Location | null) {
    return at ? editor.string(at) : '';
}
