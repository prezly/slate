import { nodeIdManager } from '@prezly/slate-commons';
import type { Editor, Element } from 'slate';
import { Transforms } from 'slate';

import type { ListsOptions } from '../types';

import { getListsInRange } from './getListsInRange';

/**
 * Sets "type" of all "list" nodes in the current selection.
 */
export function setListType(options: ListsOptions, editor: Editor, listType: string): void {
    if (!editor.selection) {
        return;
    }

    const lists = getListsInRange(options, editor, editor.selection);
    const listsIds = lists.map((list) => nodeIdManager.assign(editor, list));

    listsIds.forEach((id) => {
        const listEntry = nodeIdManager.get(editor, id);
        nodeIdManager.unassign(editor, id);

        if (!listEntry) {
            // It should never happen.
            return;
        }

        const [, listPath] = listEntry;
        Transforms.setNodes(editor, { type: listType as Element['type'] }, { at: listPath });
    });
}

