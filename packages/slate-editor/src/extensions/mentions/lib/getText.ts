import type { Location, SlateEditor } from '@udecode/plate';

/**
 * See {@link SlateEditor.string}.
 * If `at` is `null`, return an empty string.
 */
export function getText(editor: SlateEditor, at: Location | null) {
    return at ? editor.api.string(at) : '';
}
