import { Element } from 'slate';

import { ListsOptions } from '../types';

/**
 * Returns the "type" of a given list node.
 */
const getListType = (options: ListsOptions, node: unknown): string => {
    if (Element.isElement(node)) {
        return node.type;
    }

    // It should never happen.
    return options.listTypes[0];
};

export default getListType;
