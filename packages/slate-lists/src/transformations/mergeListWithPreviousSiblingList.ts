import { EditorCommands } from '@prezly/slate-commons';
import type { Node, NodeEntry } from 'slate';
import { Transforms } from 'slate';

import { getListType, getParentListItem } from '../lib';
import type { ListsEditor } from '../types';

export function mergeListWithPreviousSiblingList(
    editor: ListsEditor,
    [node, path]: NodeEntry<Node>,
): boolean {
    if (!editor.isListNode(node)) {
        // This function does not know how to normalize other nodes.
        return false;
    }

    const previousSibling = EditorCommands.getPreviousSibling(editor, path);

    if (!previousSibling) {
        // Nothing to merge with.
        return false;
    }

    const [previousSiblingNode] = previousSibling;

    if (!editor.isListNode(previousSiblingNode)) {
        return false;
    }

    const isNestedList = Boolean(getParentListItem(editor, path));
    const isPreviousSiblingSameListType =
        getListType(editor, previousSiblingNode) === getListType(editor, node);

    if (!isPreviousSiblingSameListType && !isNestedList) {
        // If previous sibling "list" is of a different type, then this fix does not apply
        // unless we're working with nested "lists".
        return false;
    }

    Transforms.mergeNodes(editor, { at: path });

    return true;
}
