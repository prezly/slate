import type { SlateEditor } from '@udecode/plate-common';
import { deselectEditor } from '@udecode/slate-react';

export function blur(editor: SlateEditor): void {
    deselectEditor(editor);
}
