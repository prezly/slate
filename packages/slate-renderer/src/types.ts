import {
    ATTACHMENT_NODE_TYPE,
    AttachmentNode,
    BlockNode,
    BULLETED_LIST_NODE_TYPE,
    CONTACT_NODE_TYPE,
    ContactNode,
    COVERAGE_NODE_TYPE,
    CoverageNode,
    DIVIDER_NODE_TYPE,
    DividerNode,
    DOCUMENT_NODE_TYPE,
    DocumentNode,
    EMBED_NODE_TYPE,
    EmbedNode,
    GALLERY_NODE_TYPE,
    GalleryNode,
    HEADING_1_NODE_TYPE,
    HEADING_2_NODE_TYPE,
    HeadingNode,
    IMAGE_NODE_TYPE,
    ImageNode,
    InlineNode,
    LINK_NODE_TYPE,
    LinkNode,
    LIST_ITEM_NODE_TYPE,
    LIST_ITEM_TEXT_NODE_TYPE,
    ListItemNode,
    ListItemTextNode,
    ListNode,
    MENTION_NODE_TYPE,
    MentionNode,
    NUMBERED_LIST_NODE_TYPE,
    PARAGRAPH_NODE_TYPE,
    ParagraphNode,
    PLACEHOLDER_NODE_TYPE,
    PlaceholderNode,
    QUOTE_NODE_TYPE,
    QuoteNode,
    TextNode,
} from '@prezly/slate-types';
import { ReactNode } from 'react';

export type Node = BlockNode | InlineNode | TextNode;

export type Render<T> = (node: T) => ReactNode;

export interface Options {
    text?: Render<TextNode>;
    [ATTACHMENT_NODE_TYPE]?: Render<AttachmentNode>;
    [BULLETED_LIST_NODE_TYPE]?: Render<ListNode>;
    [CONTACT_NODE_TYPE]?: Render<ContactNode>;
    [COVERAGE_NODE_TYPE]?: Render<CoverageNode>;
    [DIVIDER_NODE_TYPE]?: Render<DividerNode>;
    [DOCUMENT_NODE_TYPE]?: Render<DocumentNode>;
    [EMBED_NODE_TYPE]?: Render<EmbedNode>;
    [GALLERY_NODE_TYPE]?: Render<GalleryNode>;
    [HEADING_1_NODE_TYPE]?: Render<HeadingNode>;
    [HEADING_2_NODE_TYPE]?: Render<HeadingNode>;
    [IMAGE_NODE_TYPE]?: Render<ImageNode>;
    [LINK_NODE_TYPE]?: Render<LinkNode>;
    [LIST_ITEM_NODE_TYPE]?: Render<ListItemNode>;
    [LIST_ITEM_TEXT_NODE_TYPE]?: Render<ListItemTextNode>;
    [MENTION_NODE_TYPE]?: Render<MentionNode>;
    [NUMBERED_LIST_NODE_TYPE]?: Render<ListNode>;
    [PARAGRAPH_NODE_TYPE]?: Render<ParagraphNode>;
    [PLACEHOLDER_NODE_TYPE]?: Render<PlaceholderNode>;
    [QUOTE_NODE_TYPE]?: Render<QuoteNode>;
}
