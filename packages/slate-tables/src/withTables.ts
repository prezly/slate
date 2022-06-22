import type { Editor } from 'slate';

import type { TablesEditor, TablesSchema } from './TablesEditor';

export function withTables<T extends TablesEditor>(editor: TablesEditor, schema: TablesSchema) {
    return Object.assign(editor, {
        ...schema,
    }) as T & Editor;
}
