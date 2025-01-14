import { EditorCommands } from '@prezly/slate-commons';
import type { SlateEditor } from '@udecode/plate-common';
import type { Path, Range } from 'slate';

export function restoreSelection(editor: SlateEditor, selection: Path | Range): void {
    EditorCommands.focus(editor);
    editor.select(selection);
}
