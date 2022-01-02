import type { ElementNode } from '@prezly/slate-types';
import { isElementNode } from '@prezly/slate-types';

import type { ListsOptions } from '../types';

/**
 * Checks whether node.type is an Element matching options.listItemType.
 */
export function isListItem(options: ListsOptions, node: unknown): node is ElementNode {
    return isElementNode(node, options.listItemType);
}
