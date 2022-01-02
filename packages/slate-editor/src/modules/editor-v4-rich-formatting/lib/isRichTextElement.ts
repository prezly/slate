import {
    isHeadingNode,
    isListItemNode,
    isListItemTextNode,
    isListNode,
    isParagraphNode,
    isQuoteNode,
} from '@prezly/slate-types';

import type { RichTextElementType } from '../types';

export function isRichTextElement(node: unknown): node is RichTextElementType {
    return (
        isParagraphNode(node) ||
        isQuoteNode(node) ||
        isListNode(node) ||
        isListItemNode(node) ||
        isListItemTextNode(node) ||
        isHeadingNode(node)
    );
}

