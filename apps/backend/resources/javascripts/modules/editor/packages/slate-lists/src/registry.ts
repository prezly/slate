import type { SlateEditor } from '@udecode/plate';

import type { ListsSchema } from './types';

const EDITOR_LISTS_SCHEMA = new WeakMap<SlateEditor, ListsSchema>();

export function register(editor: SlateEditor, schema: ListsSchema): void {
    EDITOR_LISTS_SCHEMA.set(editor, schema);
}

export function unregister(editor: SlateEditor): void {
    EDITOR_LISTS_SCHEMA.delete(editor);
}

export function has(editor: SlateEditor) {
    return EDITOR_LISTS_SCHEMA.has(editor);
}

export function get(editor: SlateEditor): ListsSchema {
    const schema = EDITOR_LISTS_SCHEMA.get(editor);
    if (!schema) {
        throw new Error(
            'This editor instance does not have a ListsSchema associated. Make sure you initialize it with withLists() before using ListsEditor functionality.',
        );
    }
    return schema;
}
