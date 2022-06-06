import {
    isHeadingNode,
    isListItemNode,
    isListItemTextNode,
    isListNode,
} from '@prezly/slate-types';

import type { RichTextElementType } from '../types';

export function isRichTextElement(node: unknown): node is RichTextElementType {
    return (
        isListNode(node) ||
        isListItemNode(node) ||
        isListItemTextNode(node) ||
        isHeadingNode(node) // FIXME: isHeadingNode()
    );
}
