import { ElementNode, PARAGRAPH_NODE_TYPE } from '@prezly/slate-types';

type Multiple = 'multiple';
export type ParagraphType = typeof PARAGRAPH_NODE_TYPE;
export type BlockType = ParagraphType | ElementType | Multiple;

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

export type RichTextElementType = ElementNode<ParagraphType | ElementType>;

export interface LinkCandidateElementType extends ElementNode<ElementType.LINK_CANDIDATE> {
    id: string;
}

export interface RichFormattingExtensionParameters {
    blocks: boolean;
    links: boolean;
    menu: boolean;
}
