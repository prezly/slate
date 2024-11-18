import { EditorCommands } from '@prezly/slate-commons';
import { TablesEditor } from '@prezly/slate-tables';

import { EventsEditor } from '#modules/events';

export function insertTable(editor: TablesEditor) {
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

    editor.removeNodes({ match: (node) => node === currentNode });

    EventsEditor.dispatchEvent(editor, 'table-insert');
}
