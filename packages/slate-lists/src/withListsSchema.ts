import type { Editor } from 'slate';

import * as Registry from './registry';
import type { ListsSchema } from './types';

/**
 * Slate plugin to bind the ListsSchema definition to the editor instance.
 */
export function withListsSchema(schema: ListsSchema) {
    return function <T extends Editor>(editor: T): T {
        registerListsSchema(editor, schema);
        return editor;
    };
}

/**
 * Bind the ListsSchema definition to the editor instance.
 */
export function registerListsSchema(editor: Editor, schema: ListsSchema) {
    Registry.register(editor, schema);
}
