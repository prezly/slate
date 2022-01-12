import type { ElementNode, HeadingNode, ListNode, ParagraphNode, QuoteNode } from '@prezly/slate-types';
import { isHeadingNode, isListNode, isParagraphNode, isQuoteNode } from '@prezly/slate-types';

export type AlignableNode = HeadingNode | ListNode | QuoteNode | ParagraphNode;

export function isAlignableElement(
    node: ElementNode,
): node is AlignableNode {
    return isParagraphNode(node) || isHeadingNode(node) || isQuoteNode(node) || isListNode(node);
}
