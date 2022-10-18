import type { Editor } from 'slate';
import { ReactEditor } from 'slate-react';

export function blur(editor: Editor & ReactEditor): void {
    ReactEditor.deselect(editor);
}
