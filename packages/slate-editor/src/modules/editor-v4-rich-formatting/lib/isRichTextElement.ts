import { Element } from 'slate';

import { RICH_TEXT_TYPES } from '../constants';
import { RichTextElementType } from '../types';

const isRichTextElement = (node: unknown): node is RichTextElementType =>
    Element.isElement(node) && RICH_TEXT_TYPES.includes(node.type as string);

export default isRichTextElement;
