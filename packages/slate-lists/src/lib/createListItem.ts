import { Element } from 'slate';

import { ListsOptions } from '../types';

const createListItem = (options: ListsOptions, children: Element[] = []): Element => ({
    children,
    type: options.listItemType,
});

export default createListItem;
