import {
    isHeadingNode,
    isListItemNode,
    isListItemTextNode,
    isListNode,
    isParagraphNode,
    isQuoteNode,
} from '@prezly/slate-types';

import type { RichTextElementType } from '../types';

function isRichTextElement(node: unknown): node is RichTextElementType {
    return (
        isParagraphNode(node) ||
        isQuoteNode(node) ||
        isListNode(node) ||
        isListItemNode(node) ||
        isListItemTextNode(node) ||
        isHeadingNode(node)
    );
}

export default isRichTextElement;
