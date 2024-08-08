import type { OEmbedInfo } from '@prezly/sdk';
import type {
    HeadingNode,
    ListNode,
    ParagraphNode,
    QuoteNode,
    HeadingRole,
} from '@prezly/slate-types';
import { CalloutNode } from '@prezly/slate-types';
import {
    isHeadingNode,
    isListNode,
    isParagraphNode,
    isQuoteNode,
    isTableNode,
    isTableRowNode,
    isTableCellNode,
} from '@prezly/slate-types';
import type { Node } from 'slate';

export type FetchOEmbedFn = (url: string) => Promise<OEmbedInfo>;

export type Presentation = 'card' | 'embed' | 'link';

export type LinkType = 'url' | 'email' | 'predefined';

export type RichFormattedTextElement =
    | ParagraphNode
    | HeadingNode
    | QuoteNode
    | CalloutNode
    | ListNode;

export type Formatting =
    | RichFormattedTextElement['type']
    | `${HeadingRole}`
    | 'multiple'
    | 'unknown';

export function isRichFormattedTextElement(node: Node): node is RichFormattedTextElement {
    return (
        isParagraphNode(node) ||
        isHeadingNode(node) ||
        isQuoteNode(node) ||
        CalloutNode.isCalloutNode(node) ||
        isListNode(node) ||
        isTableNode(node) ||
        isTableRowNode(node) ||
        isTableCellNode(node)
    );
}
