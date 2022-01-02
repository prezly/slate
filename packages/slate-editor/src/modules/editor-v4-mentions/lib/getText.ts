import type { Location } from 'slate';
import { Editor } from 'slate';

/**
 * See {@link Editor.string}.
 * If `at` is `null`, return an empty string.
 */
export function getText(editor: Editor, at: Location | null) {
    return at ? Editor.string(editor, at) : '';
}
