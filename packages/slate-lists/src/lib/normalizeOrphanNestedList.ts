import { EditorCommands } from '@prezly/slate-commons';
import type { Editor, NodeEntry } from 'slate';
import { Node, Transforms } from 'slate';

import type { ListsOptions } from '../types';

import { getNestedList } from './getNestedList';
import { isList } from './isList';
import { isListItem } from './isListItem';
import { moveListItemsToAnotherList } from './moveListItemsToAnotherList';
import { moveListToListItem } from './moveListToListItem';

/**
 * If there is a nested "list" inside a "list-item" without a "list-item-text"
 * unwrap that nested "list" and try to nest it in previous sibling "list-item".
 */
export function normalizeOrphanNestedList(
    options: ListsOptions,
    editor: Editor,
    [node, path]: NodeEntry<Node>,
): boolean {
    if (!isListItem(options, node)) {
        // This function does not know how to normalize other nodes.
        return false;
    }

    const children = Array.from(Node.children(editor, path));

    if (children.length !== 1) {
        return false;
    }

    const [list] = children;
    const [listNode, listPath] = list;

    if (!isList(options, listNode)) {
        // If the first child is not a "list", then this fix does not apply.
        return false;
    }

    const previousListItem = EditorCommands.getPreviousSibling(editor, path);

    if (previousListItem) {
        const [, previousListItemPath] = previousListItem;
        const previousListItemNestedList = getNestedList(options, editor, previousListItemPath);

        if (previousListItemNestedList) {
            moveListItemsToAnotherList(options, editor, {
                at: list,
                to: previousListItemNestedList,
            });
        } else {
            moveListToListItem(options, editor, {
                at: list,
                to: previousListItem,
            });
        }
        // Remove now empty "list-item".
        Transforms.removeNodes(editor, { at: path });
    } else {
        // If there's no previous "list-item" to move nested "list" into, just lift it up.
        Transforms.unwrapNodes(editor, { at: listPath });
        Transforms.unwrapNodes(editor, { at: path });
    }

    return true;
}

