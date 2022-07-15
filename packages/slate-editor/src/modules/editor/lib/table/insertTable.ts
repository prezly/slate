import { EditorCommands } from '@prezly/slate-commons';
import { TablesEditor } from '@prezly/slate-tables';
import { type Editor, Transforms } from 'slate';

import { EventsEditor } from '#modules/events';

export function insertTable(editor: Editor & TablesEditor) {
    const [currentNode] = EditorCommands.getCurrentNodeEntry(editor) || [];

    if (!currentNode) {
        return;
    }

    TablesEditor.insertTable(editor, undefined, {
        header: ['first_row'],
        border: true,
        rowsCount: 3,
        columnsCount: 3,
    });

    Transforms.removeNodes(editor, { match: (node) => node === currentNode });

    EventsEditor.dispatchEvent(editor, 'table-insert');
}
