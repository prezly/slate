import { Editor, Transforms } from 'slate';

const moveCursorToNextBlock = (editor: Editor): void => {
    if (editor.selection) {
        const nextBlockPoint =
            Editor.after(editor, editor.selection, { unit: 'block' }) || Editor.end(editor, []);
        Transforms.select(editor, nextBlockPoint);
    }
};

export default moveCursorToNextBlock;
