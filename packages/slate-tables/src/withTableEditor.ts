import type { Editor } from 'slate';

import type { TableEditor, TableSchema } from './TableEditor';

export function withTableEditor<T extends TableEditor>(editor: TableEditor, schema: TableSchema) {
    return Object.assign(editor, {
        ...schema,
    }) as T & Editor;
}
