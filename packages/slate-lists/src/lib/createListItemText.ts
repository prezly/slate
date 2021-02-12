import { Descendant, Element } from 'slate';

import { ListsOptions } from '../types';

const createListItemText = (
    options: ListsOptions,
    children: Descendant[] = [{ text: '' }],
): Element => ({
    children,
    type: options.listItemTextType,
});

export default createListItemText;
