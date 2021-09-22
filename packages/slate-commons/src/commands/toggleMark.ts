import { Editor, Text } from 'slate';

import isMarkActive from './isMarkActive';

const toggleMark = (editor: Editor, mark: keyof Omit<Text, 'text'>): void => {
    if (isMarkActive(editor, mark)) {
        Editor.removeMark(editor, mark);
    } else {
        Editor.addMark(editor, mark, true);
    }
};

export default toggleMark;
