import { EditorCommands } from '@prezly/slate-commons';
import { TablesEditor } from '@prezly/slate-tables';
import type { Editor } from 'slate';
import { Transforms } from 'slate';

export function insertTable(editor: Editor) {
    const [currentNode] = EditorCommands.getCurrentNodeEntry(editor) || [];

    if (!currentNode) {
        return;
    }

    TablesEditor.insertTable(editor, undefined, 3, 3);

    Transforms.removeNodes(editor, { match: (node) => node === currentNode });
}