import type { SlateEditor } from '@udecode/plate';

import { moveCursorToEndOfDocument } from './moveCursorToEndOfDocument';

export function focus(editor: SlateEditor): void {
    editor.tf.focus();
    moveCursorToEndOfDocument(editor);
}
