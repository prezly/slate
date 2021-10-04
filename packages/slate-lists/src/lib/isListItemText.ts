import { Element } from 'slate';

import { ListsOptions } from '../types';

/**
 * Checks whether node.type is an Element matching options.listItemTextType.
 */
const isListItemText = (options: ListsOptions, node: unknown): node is Element => {
    return Element.isElement(node) && node.type === options.listItemTextType;
};

export default isListItemText;
