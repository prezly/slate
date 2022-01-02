import { Editor, Transforms } from 'slate';

export function moveCursorToEndOfDocument(editor: Editor): void {
    const endPoint = Editor.end(editor, []);
    Transforms.select(editor, endPoint);
}
