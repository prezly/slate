import { ParagraphType } from '@prezly/slate-commons';
import { Element } from 'slate';

type Multiple = 'multiple';
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

export interface RichTextElementType extends Element {
    type: ParagraphType | ElementType;
}

export interface LinkCandidateElementType extends Element {
    id: string;
    type: ElementType.LINK_CANDIDATE;
}

export interface LinkElementType extends Element {
    href: string;
    type: ElementType.LINK;
}

export interface RichFormattingExtensionParameters {
    blocks: boolean;
    links: boolean;
    menu: boolean;
}
