import { Node } from 'slate';

import { ListsOptions } from '../types';

/**
 * Returns the "type" of a given list node.
 */
const getListType = (options: ListsOptions, node: Node): string => {
    if (node.type) {
        return node.type as string;
    }

    // It should never happen.
    return options.listTypes[0];
};

export default getListType;
