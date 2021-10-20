import { isHeadingNode, isListNode, isParagraphNode, isQuoteNode } from '@prezly/slate-types';

import { RichTextElementType } from '../types';

const isRichTextBlockElement = (node: unknown): node is RichTextElementType =>
    isParagraphNode(node) || isQuoteNode(node) || isListNode(node) || isHeadingNode(node);

export default isRichTextBlockElement;
