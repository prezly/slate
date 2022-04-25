import type { Node } from 'slate';
import { Element } from 'slate';

import type { ListsEditor } from '../types';
import { ListType } from '../types';

/**
 * Returns the "type" of a given list node.
 */
export function getListType(editor: ListsEditor, node: Node): ListType {
    const isElement = Element.isElement(node);

    if (isElement && editor.isListNode(node, ListType.ORDERED)) {
        return ListType.ORDERED;
    }

    if (isElement && editor.isListNode(node, ListType.UNORDERED)) {
        return ListType.UNORDERED;
    }

    // This should never happen.
    return ListType.UNORDERED;
}
