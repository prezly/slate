import type { Range } from 'slate';
import { Editor } from 'slate';

const getEditorRange = (editor: Editor): Range | undefined => {
    // editor.children can sometimes be undefined, even though TypeScript says otherwise
    if (!editor.children || editor.children.length === 0) {
        return undefined;
    }

    return {
        anchor: Editor.start(editor, [0]),
        focus: Editor.end(editor, [editor.children.length - 1]),
    };
};

export default getEditorRange;
