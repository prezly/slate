import { Editor } from 'slate';
import { ReactEditor } from 'slate-react';

import moveCursorToEndOfDocument from './moveCursorToEndOfDocument';

const focus = (editor: Editor): void => {
    ReactEditor.focus(editor);
    moveCursorToEndOfDocument(editor);
};

export default focus;
