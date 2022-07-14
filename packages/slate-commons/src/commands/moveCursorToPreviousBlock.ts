import type { Location } from 'slate';
import { Editor, Transforms } from 'slate';

export function moveCursorToPreviousBlock(
    editor: Editor,
    location: Location | null = editor.selection,
): void {
    if (location) {
        const before = Editor.before(editor, location, { unit: 'block' });
        const prevBlockPoint = before ?? Editor.start(editor, []);
        Transforms.select(editor, prevBlockPoint);
    }
}
