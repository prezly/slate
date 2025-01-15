import type { SlateEditor } from '@udecode/plate';

export function blur(editor: SlateEditor): void {
    editor.tf.deselectDOM();
}
