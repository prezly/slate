import { Editor, Transforms } from 'slate';

const moveCursorToNextBlock = (editor: Editor): void => {
    if (editor.selection) {
        const next = Editor.after(editor, editor.selection, { unit: 'block' });
        const nextBlockPoint = next ?? Editor.end(editor, []);
        Transforms.select(editor, nextBlockPoint);
    }
};

export default moveCursorToNextBlock;
