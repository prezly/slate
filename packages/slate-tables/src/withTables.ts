import type { Editor } from 'slate';

import type { TablesEditor, TablesSchema } from './TablesEditor';
import { withNormalization } from './withNormalization';

export function withTables<T extends Editor>(editor: T, schema: TablesSchema) {
    const tablesEditor = Object.assign(editor, {
        ...schema,
    }) as T & TablesEditor;

    return withNormalization(tablesEditor);
}
