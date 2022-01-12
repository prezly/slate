import type { ElementNode, HeadingNode, ListNode, ParagraphNode, QuoteNode } from '../nodes';
import { isHeadingNode, isListNode, isParagraphNode, isQuoteNode } from '../nodes';

export type AlignableNode = HeadingNode | ListNode | QuoteNode | ParagraphNode;

export function isAlignableElement(
    node: ElementNode,
): node is AlignableNode {
    return isParagraphNode(node) || isHeadingNode(node) || isQuoteNode(node) || isListNode(node);
}
