import type {
    HeadingNode,
    ListNode,
    ListItemNode,
    ListItemTextNode,
    QuoteNode,
    ElementNode,
} from '@prezly/slate-types';

export enum ElementType {
    BLOCK_QUOTE = 'block-quote',
    BULLETED_LIST = 'bulleted-list',
    HEADING_ONE = 'heading-one',
    HEADING_TWO = 'heading-two',
    LINK = 'link',
    LINK_CANDIDATE = 'link-candidate',
    LIST_ITEM = 'list-item',
    LIST_ITEM_TEXT = 'list-item-text',
    NUMBERED_LIST = 'numbered-list',
}

export enum MarkType {
    BOLD = 'bold',
    ITALIC = 'italic',
    UNDERLINED = 'underlined',
    SUBSCRIPT = 'subscript',
    SUPERSCRIPT = 'superscript',
}

export type RichTextElementType =
    | HeadingNode
    | ListNode
    | ListItemNode
    | ListItemTextNode
    | QuoteNode;

export interface LinkCandidateNode extends ElementNode {
    type: ElementType.LINK_CANDIDATE;
    id: string;
}

export interface RichFormattingExtensionParameters {
    blocks: boolean;
}
