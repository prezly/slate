import type { Editor, Element, NodeEntry, Path } from 'slate';
import { Node } from 'slate';

import { NESTED_LIST_PATH_INDEX } from '../constants';
import type { ListsOptions } from '../types';

import isList from './isList';

/**
 * Returns "list" node nested in "list-item" at a given path.
 * Returns null if there is no nested "list".
 */
function getNestedList(
    options: ListsOptions,
    editor: Editor,
    listItemPath: Path,
): NodeEntry<Element> | null {
    const nestedListPath = [...listItemPath, NESTED_LIST_PATH_INDEX];

    if (!Node.has(editor, nestedListPath)) {
        return null;
    }

    const nestedList = Node.get(editor, nestedListPath);

    if (!isList(options, nestedList)) {
        // Sanity check.
        return null;
    }

    return [nestedList, nestedListPath];
}

export default getNestedList;
