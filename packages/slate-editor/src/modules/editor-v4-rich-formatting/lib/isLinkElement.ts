import { Element, Node } from 'slate';

import { ElementType, LinkElementType } from '../types';

const isLinkElement = (node: Node): node is LinkElementType =>
    Element.isElement(node) &&
    node.type === ElementType.LINK &&
    typeof node.href === 'string' &&
    node.href.length > 0;

export default isLinkElement;
