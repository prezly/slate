import { EditorCommands } from '@prezly/slate-commons';
import { Editor, Node, NodeEntry, Transforms } from 'slate';

import { ListsOptions } from '../types';

import getParentListItem from './getParentListItem';
import isList from './isList';

const mergeListWithPreviousSiblingList = (
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

    Transforms.mergeNodes(editor, { at: path });

    return true;
};

export default mergeListWithPreviousSiblingList;
