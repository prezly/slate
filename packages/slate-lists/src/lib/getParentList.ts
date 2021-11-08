import { ElementNode } from '@prezly/slate-types';
import { Editor, NodeEntry, Path } from 'slate';

import { ListsOptions } from '../types';
import isList from './isList';

/**
 * Returns parent "list" node of "list-item" at a given path.
 * Returns null if there is no parent "list".
 */
const getParentList = (
    options: ListsOptions,
    editor: Editor,
    listItemPath: Path,
): NodeEntry<ElementNode> | null => {
    const parentList = Editor.above<ElementNode>(editor, {
        at: listItemPath,
        match: (node) => isList(options, node),
    });

    if (parentList && isList(options, parentList[0])) {
        return parentList;
    }

    return null;
};

export default getParentList;
