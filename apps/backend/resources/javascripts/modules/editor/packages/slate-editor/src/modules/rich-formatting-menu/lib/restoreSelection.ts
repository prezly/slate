import { EditorCommands } from '@prezly/slate-commons';
import type { Path, Range, SlateEditor } from '@udecode/plate';

export function restoreSelection(editor: SlateEditor, selection: Path | Range): void {
    EditorCommands.focus(editor);
    editor.tf.select(selection);
}
