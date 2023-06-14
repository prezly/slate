import type { Editor } from 'slate';

import { normalizeNode } from './normalizeNode';
import type { ListsEditor, ListsSchema } from './types';

interface Options {
    normalizations?: boolean;
}

/**
 * Enables normalizations that enforce schema constraints and recover from unsupported cases.
 */
export function withLists(schema: ListsSchema, { normalizations = true }: Options = {}) {
    return function <T extends Editor>(editor: T): T & ListsEditor {
        const listsEditor: T & ListsEditor = Object.assign(editor, {
            isConvertibleToListTextNode: schema.isConvertibleToListTextNode,
            isDefaultTextNode: schema.isDefaultTextNode,
            isListNode: schema.isListNode,
            isListItemNode: schema.isListItemNode,
            isListItemTextNode: schema.isListItemTextNode,
            createDefaultTextNode: schema.createDefaultTextNode,
            createListNode: schema.createListNode,
            createListItemNode: schema.createListItemNode,
            createListItemTextNode: schema.createListItemTextNode,
        });

        if (normalizations) {
            const parent = { normalizeNode: listsEditor.normalizeNode };
            listsEditor.normalizeNode = (entry) => {
                normalizeNode(editor, entry) || parent.normalizeNode(entry);
            };
        }

        return listsEditor;
    };
}
