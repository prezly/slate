import type { SlateEditor } from '@udecode/plate-common';
import { focusEditor } from '@udecode/slate-react';

import { moveCursorToEndOfDocument } from './moveCursorToEndOfDocument';

export function focus(editor: SlateEditor): void {
    focusEditor(editor);
    moveCursorToEndOfDocument(editor);
}
