import type { Editor, Node, NodeEntry } from 'slate';
import { Transforms } from 'slate';

import { NESTED_LIST_PATH_INDEX } from '../constants';
import type { ListsOptions } from '../types';

import { isList } from './isList';
import { isListItem } from './isListItem';

/**
 * Nests (moves) given "list" in a given "list-item".
 */
export function moveListToListItem(
    options: ListsOptions,
    editor: Editor,
    parameters: {
        at: NodeEntry<Node>;
        to: NodeEntry<Node>;
    },
): void {
    const [sourceListNode, sourceListPath] = parameters.at;
    const [targetListNode, targetListPath] = parameters.to;

    if (!isList(options, sourceListNode) || !isListItem(options, targetListNode)) {
        // Sanity check.
        return;
    }

    Transforms.moveNodes(editor, {
        at: sourceListPath,
        to: [...targetListPath, NESTED_LIST_PATH_INDEX],
    });
}

