import { Element, Node } from 'slate';

import { ListsOptions } from '../types';

const isListItem = (options: ListsOptions, node: Node): node is Element => {
    return Element.isElement(node) && node.type === options.listItemType;
};

export default isListItem;
