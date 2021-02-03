import { Element } from 'slate';

import { PARAGRAPH_TYPE } from '../constants';
import { ParagraphElementType } from '../types';

const isParagraphElement = (node: any): node is ParagraphElementType =>
    Element.isElement(node) && node.type === PARAGRAPH_TYPE;

export default isParagraphElement;
