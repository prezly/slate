import { Element, Node } from 'slate';

import { ListsOptions } from '../types';

/**
 * Checks whether node.type is an Element matching any of options.listTypes.
 */
const isList = (options: ListsOptions, node: Node): node is Element => {
    return Element.isElement(node) && options.listTypes.includes(node.type as string);
};

export default isList;
