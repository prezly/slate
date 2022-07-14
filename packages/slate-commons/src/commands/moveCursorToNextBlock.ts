import type { Location } from 'slate';
import { Editor, Transforms } from 'slate';

export function moveCursorToNextBlock(
    editor: Editor,
    location: Location | null = editor.selection,
): void {
    if (location) {
        const next = Editor.after(editor, location, { unit: 'block' });
        const nextBlockPoint = next ?? Editor.end(editor, []);
        Transforms.select(editor, nextBlockPoint);
    }
}
