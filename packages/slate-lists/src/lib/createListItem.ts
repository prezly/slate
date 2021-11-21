import type { ListItemNode } from '@prezly/slate-types';
import createListItemText from './createListItemText';

import type { ListsOptions } from '../types';

const createListItem = (
    options: ListsOptions,
    children?: ListItemNode['children'],
): ListItemNode => ({
    children: Array.isArray(children) ? children : [createListItemText(options)],
    type: options.listItemType as ListItemNode['type'],
});

export default createListItem;
