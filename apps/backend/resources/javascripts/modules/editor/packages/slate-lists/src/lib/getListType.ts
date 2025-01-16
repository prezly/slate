import { ElementApi, type Node } from '@udecode/plate';

import type { ListsSchema } from '../types';
import { ListType } from '../types';

/**
 * Returns the "type" of a given list node.
 */
export function getListType(schema: ListsSchema, node: Node): ListType {
    const isElement = ElementApi.isElement(node);

    if (isElement && schema.isListNode(node, ListType.ORDERED)) {
        return ListType.ORDERED;
    }

    if (isElement && schema.isListNode(node, ListType.UNORDERED)) {
        return ListType.UNORDERED;
    }

    // This should never happen.
    return ListType.UNORDERED;
}
