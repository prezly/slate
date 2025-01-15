import type { Location, SlateEditor } from '@udecode/plate';

export function moveCursorToPreviousBlock(
    editor: SlateEditor,
    location: Location | null = editor.selection,
): void {
    if (location) {
        const before = editor.api.before(location, { unit: 'block' });
        const prevBlockPoint = before ?? editor.api.start([]);
        editor.tf.select(prevBlockPoint);
    }
}
