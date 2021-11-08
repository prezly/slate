import { ElementNode, isElementNode } from '@prezly/slate-types';

import { ListsOptions } from '../types';

/**
 * Checks whether node.type is an Element matching any of options.listTypes.
 */
function isList(options: ListsOptions, node: unknown): node is ElementNode {
    return isElementNode(node, options.listTypes);
}

export default isList;
