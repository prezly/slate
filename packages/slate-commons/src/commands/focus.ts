import { ReactEditor } from 'slate-react';

import moveCursorToEndOfDocument from './moveCursorToEndOfDocument';

const focus = (editor: ReactEditor): void => {
    ReactEditor.focus(editor);
    moveCursorToEndOfDocument(editor);
};

export default focus;
