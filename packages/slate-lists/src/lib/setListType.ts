import { Editor, type Element, Node, Transforms } from 'slate';

import type { ListType, ListsEditor } from '../types';

import { getListsInRange } from './getListsInRange';

/**
 * Sets "type" of all "list" nodes in the current selection.
 */
export function setListType(editor: ListsEditor, listType: ListType): void {
    if (!editor.selection) {
        return;
    }

    const lists = getListsInRange(editor, editor.selection);
    const refs = lists.map(([_, path]) => Editor.pathRef(editor, path));

    refs.forEach((ref) => {
        const path = ref.current;
        const node = path ? Node.get(editor, path) : null;

        if (node && path) {
            Transforms.setNodes(editor, editor.createListNode(listType, node as Element), {
                at: path,
            });
        }

        ref.unref();
    });
}
