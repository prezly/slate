import { Editor } from 'slate';

import isMarkActive from './isMarkActive';

const toggleMark = (editor: Editor, mark: string): void => {
    if (isMarkActive(editor, mark)) {
        Editor.removeMark(editor, mark);
    } else {
        Editor.addMark(editor, mark, true);
    }
};

export default toggleMark;
