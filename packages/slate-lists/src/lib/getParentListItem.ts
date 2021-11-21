import type { ElementNode } from '@prezly/slate-types';
import type { NodeEntry, Path } from 'slate';
import { Editor } from 'slate';

import type { ListsOptions } from '../types';

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
