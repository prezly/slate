import { Editor, type Element, Node, Transforms } from 'slate';

import { getListsInRange } from '../lib';
import type { ListsSchema, ListType } from '../types';

/**
 * Sets "type" of all "list" nodes in the current selection.
 */
export function setListType(editor: Editor, schema: ListsSchema, listType: ListType): void {
    if (!editor.selection) {
        return;
    }

    const lists = getListsInRange(editor, schema, editor.selection);
    const refs = lists.map(([_, path]) => Editor.pathRef(editor, path));

    refs.forEach((ref) => {
        const path = ref.current;
        const node = path ? Node.get(editor, path) : null;

        if (node && path) {
            Transforms.setNodes(editor, schema.createListNode(listType, node as Element), {
                at: path,
            });
        }

        ref.unref();
    });
}
