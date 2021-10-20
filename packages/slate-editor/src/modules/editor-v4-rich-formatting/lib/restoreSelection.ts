import { EditorCommands } from '@prezly/slate-commons';
import { Editor, Path, Range, Transforms } from 'slate';

const restoreSelection = (editor: Editor, selection: Path | Range): void => {
    EditorCommands.focus(editor);
    Transforms.select(editor, selection);
};

export default restoreSelection;
