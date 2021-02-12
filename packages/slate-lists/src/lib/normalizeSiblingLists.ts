import { EditorCommands } from '@prezly/slate-commons';
import { Editor, Node, NodeEntry, Transforms } from 'slate';

import { ListsOptions } from '../types';

import getParentListItem from './getParentListItem';
import isList from './isList';

/**
 * If there are 2 "lists" of the same type next to each other, merge them together.
 * If there are 2 nested "lists" next to each other, merge them together.
 */
const normalizeSiblingLists = (
    options: ListsOptions,
    editor: Editor,
    [node, path]: NodeEntry<Node>,
): boolean => {
    if (!isList(options, node)) {
        // This function does not know how to normalize other nodes.
        return false;
    }

    const previousSibling = EditorCommands.getPreviousSibling(editor, path);

    if (!previousSibling) {
        // Nothing to merge with.
        return false;
    }

    const [previousSiblingNode] = previousSibling;

    if (!isList(options, previousSiblingNode)) {
        return false;
    }

    const isNestedList = Boolean(getParentListItem(options, editor, path));
    const isPreviousSiblingSameListType = previousSiblingNode.type === node.type;

    if (!isPreviousSiblingSameListType && !isNestedList) {
        // If previous sibling "list" is of a different type, then this fix does not apply
        // unless we're working with nested "lists".
        return false;
    }

    Transforms.setNodes(editor, { type: previousSiblingNode.type }, { at: path });
    Transforms.mergeNodes(editor, { at: path });

    return true;
};

export default normalizeSiblingLists;
