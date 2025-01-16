import type { Location, SlateEditor } from '@udecode/plate';

export function moveCursorToNextBlock(
    editor: SlateEditor,
    location: Location | null = editor.selection,
): void {
    if (location) {
        const next = editor.api.after(location, { unit: 'block' });
        const nextBlockPoint = next ?? editor.api.end([]);
        editor.tf.select(nextBlockPoint);
    }
}
