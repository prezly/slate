import { ListItemTextNode } from '@prezly/slate-types';

import { ListsOptions } from '../types';

const createListItemText = (
    options: ListsOptions,
    children: ListItemTextNode['children'] = [{ text: '' }],
): ListItemTextNode => ({
    children,
    type: options.listItemTextType as ListItemTextNode['type'],
});

export default createListItemText;
