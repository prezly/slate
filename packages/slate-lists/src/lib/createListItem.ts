import { ListItemNode } from '@prezly/slate-types';

import { ListsOptions } from '../types';

const createListItem = (options: ListsOptions, children?: ListItemNode['children']) => ({
    children: Array.isArray(children) ? children : [],
    type: options.listItemType as ListItemNode['type'],
});

export default createListItem;
