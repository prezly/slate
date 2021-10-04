import { ListItemTextNode } from '@prezly/slate-types';
import { Element } from 'slate';

import { ListsOptions } from '../types';

const createListItemText = (
    options: ListsOptions,
    children: ListItemTextNode['children'] = [{ text: '' }],
): Element => ({
    children,
    type: options.listItemTextType as ListItemTextNode['type'],
});

export default createListItemText;
