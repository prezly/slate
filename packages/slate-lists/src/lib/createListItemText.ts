import type { ListItemTextNode } from '@prezly/slate-types';

import type { ListsOptions } from '../types';

export function createListItemText(
    options: ListsOptions,
    children: ListItemTextNode['children'] = [{ text: '' }],
): ListItemTextNode {
    return {
        children,
        type: options.listItemTextType as ListItemTextNode['type'],
    };
}
