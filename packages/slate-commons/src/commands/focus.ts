import type { Editor } from 'slate';
import { ReactEditor } from 'slate-react';

import { moveCursorToEndOfDocument } from './moveCursorToEndOfDocument';

export function focus(editor: Editor & ReactEditor): void {
    ReactEditor.focus(editor);
    moveCursorToEndOfDocument(editor);
}
