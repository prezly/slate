import type { ListItemNode } from '@prezly/slate-types';

import type { ListsOptions } from '../types';

import { createListItemText } from './createListItemText';

export function createListItem(
    options: ListsOptions,
    children?: ListItemNode['children'],
): ListItemNode {
    return {
        children: Array.isArray(children) ? children : [createListItemText(options)],
        type: options.listItemType as ListItemNode['type'],
    };
}
