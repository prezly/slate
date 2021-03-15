import { EditorCommands } from '@prezly/slate-commons';
import { Path, Range, Transforms } from 'slate';
import { ReactEditor } from 'slate-react';

const restoreSelection = (editor: ReactEditor, selection: Path | Range): void => {
    EditorCommands.focus(editor);
    Transforms.select(editor, selection);
};

export default restoreSelection;
