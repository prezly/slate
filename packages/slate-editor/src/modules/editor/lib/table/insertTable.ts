import { TableEditor } from '@prezly/slate-tables';
import type { Editor } from 'slate';

export function insertTable(editor: Editor) {
    TableEditor.insertTable(editor, undefined, 3, 3);
}
