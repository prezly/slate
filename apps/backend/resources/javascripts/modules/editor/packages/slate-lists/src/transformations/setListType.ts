import type { SlateEditor } from '@udecode/plate-common';
import type { Location } from 'slate';
import { type Element, Node } from 'slate';

import { getLists } from '../lib';
import type { ListsSchema, ListType } from '../types';

/**
 * Sets "type" of all "list" nodes in the current selection.
 */
export function setListType(
    editor: SlateEditor,
    schema: ListsSchema,
    listType: ListType,
    at: Location | null = editor.selection,
): boolean {
    if (!at) {
        return false;
    }

    const lists = getLists(editor, schema, at);

    if (lists.length === 0) {
        return false;
    }

    const refs = lists.map(([_, path]) => editor.pathRef(path));

    refs.forEach((ref) => {
        const path = ref.current;
        const node = path ? Node.get(editor, path) : null;

        if (node && path) {
            editor.setNodes(schema.createListNode(listType, node as Element), {
                at: path,
            });
        }

        ref.unref();
    });

    return true;
}
