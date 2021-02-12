import { Element, Node } from 'slate';

import { ListsOptions } from '../types';

const isList = (options: ListsOptions, node: Node): node is Element => {
    return Element.isElement(node) && options.listTypes.includes(node.type as string);
};

export default isList;
