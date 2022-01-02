import { isHeadingNode, isListNode, isParagraphNode, isQuoteNode } from '@prezly/slate-types';

import type { RichTextElementType } from '../types';

export function isRichTextBlockElement(node: unknown): node is RichTextElementType {
    return isParagraphNode(node) || isQuoteNode(node) || isListNode(node) || isHeadingNode(node);
}

