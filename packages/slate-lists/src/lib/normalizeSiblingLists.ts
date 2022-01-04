import { EditorCommands } from '@prezly/slate-commons';
import type { Editor, Node, NodeEntry } from 'slate';

import type { ListsOptions } from '../types';

import { mergeListWithPreviousSiblingList } from './mergeListWithPreviousSiblingList';

/**
 * If there are 2 "lists" of the same type next to each other, merge them together.
 * If there are 2 nested "lists" next to each other, merge them together.
 */
export function normalizeSiblingLists(
    options: ListsOptions,
    editor: Editor,
    entry: NodeEntry<Node>,
): boolean {
    const normalized = mergeListWithPreviousSiblingList(options, editor, entry);

    if (normalized) {
        return true;
    }

    const [, path] = entry;
    const nextSibling = EditorCommands.getNextSibling(editor, path);

    if (!nextSibling) {
        return false;
    }

    return mergeListWithPreviousSiblingList(options, editor, nextSibling);
}
