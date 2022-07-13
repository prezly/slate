import { nodeIdManager } from '@prezly/slate-commons';
import type { ListNode } from '@prezly/slate-types';
import { Transforms } from 'slate';

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
    const listsIds = lists.map((list) => nodeIdManager.assign(editor, list));

    listsIds.forEach((id) => {
        const listEntry = nodeIdManager.get(editor, id);
        nodeIdManager.unassign(editor, id);

        if (!listEntry) {
            // It should never happen.
            return;
        }

        const [listNode, listPath] = listEntry;
        Transforms.setNodes(editor, editor.createListNode(listType, listNode as ListNode), {
            at: listPath,
        });
    });
}
