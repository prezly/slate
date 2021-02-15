import { Editor, Node, NodeEntry, Transforms } from 'slate';

import { ListsOptions } from '../types';

import isList from './isList';

/**
 * Moves all "list-items" from one "list" to the end of another "list".
 */
const moveListItemsToAnotherList = (
    options: ListsOptions,
    editor: Editor,
    parameters: {
        at: NodeEntry<Node>;
        to: NodeEntry<Node>;
    },
): void => {
    const [sourceListNode, sourceListPath] = parameters.at;
    const [targetListNode, targetListPath] = parameters.to;

    if (!isList(options, sourceListNode) || !isList(options, targetListNode)) {
        // Sanity check.
        return;
    }

    for (let i = 0; i < sourceListNode.children.length; ++i) {
        Transforms.moveNodes(editor, {
            at: [...sourceListPath, 0],
            to: [...targetListPath, targetListNode.children.length + i],
        });
    }
};

export default moveListItemsToAnotherList;
