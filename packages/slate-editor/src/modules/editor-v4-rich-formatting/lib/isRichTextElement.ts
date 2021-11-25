import {
    isHeadingNode,
    isListItemNode,
    isListItemTextNode,
    isListNode,
    isParagraphNode,
    isQuoteNode,
} from '@prezly/slate-types';

import type { RichTextElementType } from '../types';

const isRichTextElement = (node: unknown): node is RichTextElementType =>
    isParagraphNode(node) ||
    isQuoteNode(node) ||
    isListNode(node) ||
    isListItemNode(node) ||
    isListItemTextNode(node) ||
    isHeadingNode(node);

export default isRichTextElement;
