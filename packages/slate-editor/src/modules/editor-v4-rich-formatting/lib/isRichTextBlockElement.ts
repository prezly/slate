import { Element } from 'slate';

import { RICH_TEXT_BLOCK_TYPES } from '../constants';
import { RichTextElementType } from '../types';

const isRichTextBlockElement = (node: unknown): node is RichTextElementType =>
    Element.isElement(node) && (RICH_TEXT_BLOCK_TYPES as string[]).includes(node.type as string);

export default isRichTextBlockElement;
