import type { Editor } from 'slate';

import { withTablesCopyPasteBehavior, withTablesDeleteBehavior } from './core';
import type { TablesEditor, TablesSchema } from './TablesEditor';
import { withNormalization } from './withNormalization';
import { withTablesSchema } from './withTablesSchema';

export function withTables<T extends Editor>(editor: T, schema: TablesSchema): T & TablesEditor {
    return withTablesDeleteBehavior(
        withTablesCopyPasteBehavior(withNormalization(withTablesSchema(editor, schema))),
    );
}
