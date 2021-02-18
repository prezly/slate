import { Editor, Element, NodeEntry, Path } from 'slate';

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
): NodeEntry<Element> | null => {
    const parentList = Editor.above(editor, {
        at: listItemPath,
        match: (node) => options.listTypes.includes(node.type as string),
    });

    if (parentList && isList(options, parentList[0])) {
        return parentList;
    }

    return null;
};

export default getParentList;
