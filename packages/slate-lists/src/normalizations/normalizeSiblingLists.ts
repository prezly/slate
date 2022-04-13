import { EditorCommands } from '@prezly/slate-commons';
import type { Node, NodeEntry } from 'slate';

import { mergeListWithPreviousSiblingList } from '../lib';
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
    const nextSibling = EditorCommands.getNextSibling(editor, path);

    if (!nextSibling) {
        return false;
    }

    return mergeListWithPreviousSiblingList(editor, nextSibling);
}
