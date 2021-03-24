import { Element, Node } from 'slate';

import { DIVIDER_TYPE } from '../constants';
import { DividerElementType } from '../types';

const isDividerElement = (node: Node): node is DividerElementType =>
    Element.isElement(node) && node.type === DIVIDER_TYPE;

export default isDividerElement;
