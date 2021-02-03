import { Editor } from 'slate';

const isMarkActive = (editor: Editor, mark: string): boolean => {
    const marks = Editor.marks(editor);
    return marks ? marks[mark] === true : false;
};

export default isMarkActive;
