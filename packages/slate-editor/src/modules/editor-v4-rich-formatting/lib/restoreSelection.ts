import { EditorCommands } from '@prezly/slate-commons';
import type { Editor, Path, Range } from 'slate';
import { Transforms } from 'slate';

export function restoreSelection(editor: Editor, selection: Path | Range): void {
    EditorCommands.focus(editor);
    Transforms.select(editor, selection);
}
