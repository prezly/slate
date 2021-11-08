import { ElementNode } from '@prezly/slate-types';
import { Editor, NodeEntry, Path } from 'slate';

import { ListsOptions } from '../types';

import isListItem from './isListItem';

/**
 * Returns parent "list-item" node of "list-item" at a given path.
 * Returns null if there is no parent "list-item".
 */
const getParentListItem = (
    options: ListsOptions,
    editor: Editor,
    listItemPath: Path,
): NodeEntry<ElementNode> | null => {
    const parentListItem = Editor.above<ElementNode>(editor, {
        at: listItemPath,
        match: (node) => isListItem(options, node),
    });

    if (parentListItem && isListItem(options, parentListItem[0])) {
        return parentListItem;
    }

    return null;
};

export default getParentListItem;
