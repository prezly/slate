import { Element } from 'slate';

import { ListsOptions } from '../types';

const createDefaultNode = (options: ListsOptions): Element => ({
    children: [],
    type: options.defaultBlockType,
});

export default createDefaultNode;
