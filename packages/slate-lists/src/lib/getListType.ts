import { Element } from 'slate';

import type { ListsOptions } from '../types';

/**
 * Returns the "type" of a given list node.
 */
export function getListType(options: ListsOptions, node: unknown): string {
    if (Element.isElement(node)) {
        return node.type;
    }

    // It should never happen.
    return options.listTypes[0];
}

