import { Editor, Transforms } from 'slate';

function moveCursorToEndOfDocument(editor: Editor): void {
    const endPoint = Editor.end(editor, []);
    Transforms.select(editor, endPoint);
}

export default moveCursorToEndOfDocument;
