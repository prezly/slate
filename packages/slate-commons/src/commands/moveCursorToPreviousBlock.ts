import { Editor, Transforms } from 'slate';

export function moveCursorToPreviousBlock(editor: Editor): void {
    if (editor.selection) {
        const before = Editor.before(editor, editor.selection, { unit: 'block' });
        const prevBlockPoint = before ?? Editor.start(editor, []);
        Transforms.select(editor, prevBlockPoint);
    }
}
