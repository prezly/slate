import { ElementNode, isElementNode } from '@prezly/slate-types';

import { ListsOptions } from '../types';

/**
 * Checks whether node.type is an Element matching options.listItemType.
 */
function isListItem(options: ListsOptions, node: unknown): node is ElementNode {
    return isElementNode(node, options.listItemType);
}

export default isListItem;
