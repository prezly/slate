import type { SlateEditor } from '@udecode/plate';

export function moveCursorToEndOfDocument(editor: SlateEditor): void {
    const endPoint = editor.api.end([]);
    editor.tf.select(endPoint);
}
