import type { Editor } from 'slate';

import type { TablesEditor, TablesSchema } from './TablesEditor';

export function withTablesSchema<T extends Editor>(
    editor: T,
    schema: TablesSchema,
): T & TablesEditor {
    return Object.assign(editor, {
        ...schema,
    }) as T & TablesEditor;
}
