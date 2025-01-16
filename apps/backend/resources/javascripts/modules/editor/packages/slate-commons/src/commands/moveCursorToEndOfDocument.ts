import type { SlateEditor } from '@udecode/plate-common';

export function moveCursorToEndOfDocument(editor: SlateEditor): void {
    const endPoint = editor.end([]);
    editor.select(endPoint);
}
