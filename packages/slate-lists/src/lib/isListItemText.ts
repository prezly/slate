import { Element, Node } from 'slate';

import { ListsOptions } from '../types';

const isListItemText = (options: ListsOptions, node: Node): node is Element => {
    return Element.isElement(node) && node.type === options.listItemTextType;
};

export default isListItemText;
