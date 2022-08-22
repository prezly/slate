import type { Node, NodeEntry } from 'slate';

import { getNextSibling } from '../lib';
import { mergeListWithPreviousSiblingList } from '../transformations';
import type { ListsEditor } from '../types';

/**
 * If there are 2 "lists" of the same type next to each other, merge them together.
 * If there are 2 nested "lists" next to each other, merge them together.
 */
export function normalizeSiblingLists(editor: ListsEditor, entry: NodeEntry<Node>): boolean {
    const normalized = mergeListWithPreviousSiblingList(editor, entry);

    if (normalized) {
        return true;
    }

    const [, path] = entry;
    const nextSibling = getNextSibling(editor, path);

    if (!nextSibling) {
        return false;
    }

    return mergeListWithPreviousSiblingList(editor, nextSibling);
}
