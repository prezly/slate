import type { SlateEditor } from '@udecode/plate-common';
import type { Location } from 'slate';

export function moveCursorToPreviousBlock(
    editor: SlateEditor,
    location: Location | null = editor.selection,
): void {
    if (location) {
        const before = editor.before(location, { unit: 'block' });
        const prevBlockPoint = before ?? editor.start([]);
        editor.select(prevBlockPoint);
    }
}
