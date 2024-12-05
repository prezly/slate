import type { SlateEditor } from '@udecode/plate-common';
import type { Location } from 'slate';

export function moveCursorToNextBlock(
    editor: SlateEditor,
    location: Location | null = editor.selection,
): void {
    if (location) {
        const next = editor.after(location, { unit: 'block' });
        const nextBlockPoint = next ?? editor.end([]);
        editor.select(nextBlockPoint);
    }
}
