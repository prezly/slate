import { Editor, Range } from 'slate';

import isSelectionValid from './isSelectionValid';

const isSelectionEmpty = (editor: Editor): boolean => {
    if (!editor.selection || !isSelectionValid(editor)) {
        return true;
    }

    return Range.isCollapsed(editor.selection) && Editor.string(editor, editor.selection) === '';
};

export default isSelectionEmpty;
