import type { SlateEditor } from '@udecode/plate-common';
import { focusEditor } from '@udecode/plate-common/react';

import { moveCursorToEndOfDocument } from './moveCursorToEndOfDocument';

export function focus(editor: SlateEditor): void {
    focusEditor(editor);
    moveCursorToEndOfDocument(editor);
}
