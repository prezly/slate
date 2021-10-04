import { Element, Node } from 'slate';

import { ListsOptions } from '../types';

/**
 * Checks whether node.type is an Element matching options.listItemType.
 */
const isListItem = (options: ListsOptions, node: unknown): node is Element => {
    return Element.isElement(node) && node.type === options.listItemType;
};

export default isListItem;
