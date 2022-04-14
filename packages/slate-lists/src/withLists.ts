import type { Editor, NodeEntry } from 'slate';

import {
    normalizeList,
    normalizeListChildren,
    normalizeListItemChildren,
    normalizeListItemTextChildren,
    normalizeOrphanListItem,
    normalizeOrphanListItemText,
    normalizeOrphanNestedList,
    normalizeSiblingLists,
} from './normalizations';
import type { ListsEditor, ListsSchema } from './types';

type Normalizer = (editor: ListsEditor, entry: NodeEntry) => boolean;

const LIST_NORMALIZERS: Normalizer[] = [
    normalizeList,
    normalizeListChildren,
    normalizeListItemChildren,
    normalizeListItemTextChildren,
    normalizeOrphanListItem,
    normalizeOrphanListItemText,
    normalizeOrphanNestedList,
    normalizeSiblingLists,
];

/**
 * Enables normalizations that enforce schema constraints and recover from unsupported cases.
 */
export function withLists(schema: ListsSchema) {
    return function <T extends Editor>(editor: T): T & ListsEditor {
        const listsEditor: T & ListsEditor = Object.assign(editor, {
            isAllowedListDescendant: schema.isAllowedListDescendant,
            isDefaultTextNode: schema.isDefaultTextNode,
            isListNode: schema.isListNode,
            isListItemNode: schema.isListItemNode,
            isListItemTextNode: schema.isListItemTextNode,
            createDefaultTextNode: schema.createDefaultTextNode,
            createListNode: schema.createListNode,
            createListItemNode: schema.createListItemNode,
            createListItemTextNode: schema.createListItemTextNode,
        });

        return withNormalizations(listsEditor, LIST_NORMALIZERS);
    };
}

function withNormalizations<T extends ListsEditor>(editor: T, normalizers: Normalizer[]): T {
    const { normalizeNode } = editor;

    editor.normalizeNode = (entry) => {
        for (const normalize of normalizers) {
            const changed = normalize(editor, entry);
            if (changed) {
                return;
            }
        }

        normalizeNode(entry);
    };
    return editor;
}
