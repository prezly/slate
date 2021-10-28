import {
    ATTACHMENT_NODE_TYPE,
    BULLETED_LIST_NODE_TYPE,
    CONTACT_NODE_TYPE,
    COVERAGE_NODE_TYPE,
    DIVIDER_NODE_TYPE,
    DOCUMENT_NODE_TYPE,
    EMBED_NODE_TYPE,
    GALLERY_NODE_TYPE,
    HEADING_1_NODE_TYPE,
    HEADING_2_NODE_TYPE,
    IMAGE_NODE_TYPE,
    LINK_NODE_TYPE,
    LIST_ITEM_NODE_TYPE,
    LIST_ITEM_TEXT_NODE_TYPE,
    MENTION_NODE_TYPE,
    NUMBERED_LIST_NODE_TYPE,
    PARAGRAPH_NODE_TYPE,
    PLACEHOLDER_NODE_TYPE,
    QUOTE_NODE_TYPE,
    AttachmentNode,
    BlockNode,
    ContactNode,
    CoverageNode,
    DividerNode,
    DocumentNode,
    EmbedNode,
    GalleryNode,
    HeadingNode,
    ImageNode,
    InlineNode,
    LinkNode,
    ListItemNode,
    ListItemTextNode,
    ListNode,
    MentionNode,
    ParagraphNode,
    PlaceholderNode,
    QuoteNode,
    TextNode,
} from '@prezly/slate-types';
import { FunctionComponent } from 'react';
import { Element } from 'slate';

export type Node = BlockNode | InlineNode | TextNode;

export type NodeRenderer<T extends Element> = FunctionComponent<{ node: T }>;

export type TextRenderer = FunctionComponent<TextNode & { children?: never }>;

export interface Options {
    [ATTACHMENT_NODE_TYPE]?: NodeRenderer<AttachmentNode>;
    [BULLETED_LIST_NODE_TYPE]?: NodeRenderer<ListNode>;
    [CONTACT_NODE_TYPE]?: NodeRenderer<ContactNode>;
    [COVERAGE_NODE_TYPE]?: NodeRenderer<CoverageNode>;
    [DIVIDER_NODE_TYPE]?: NodeRenderer<DividerNode>;
    [DOCUMENT_NODE_TYPE]?: NodeRenderer<DocumentNode>;
    [EMBED_NODE_TYPE]?: NodeRenderer<EmbedNode>;
    [GALLERY_NODE_TYPE]?: NodeRenderer<GalleryNode>;
    [HEADING_1_NODE_TYPE]?: NodeRenderer<HeadingNode>;
    [HEADING_2_NODE_TYPE]?: NodeRenderer<HeadingNode>;
    [IMAGE_NODE_TYPE]?: NodeRenderer<ImageNode>;
    [LINK_NODE_TYPE]?: NodeRenderer<LinkNode>;
    [LIST_ITEM_NODE_TYPE]?: NodeRenderer<ListItemNode>;
    [LIST_ITEM_TEXT_NODE_TYPE]?: NodeRenderer<ListItemTextNode>;
    [MENTION_NODE_TYPE]?: NodeRenderer<MentionNode>;
    [NUMBERED_LIST_NODE_TYPE]?: NodeRenderer<ListNode>;
    [PARAGRAPH_NODE_TYPE]?: NodeRenderer<ParagraphNode>;
    [PLACEHOLDER_NODE_TYPE]?: NodeRenderer<PlaceholderNode>;
    [QUOTE_NODE_TYPE]?: NodeRenderer<QuoteNode>;
    text?: TextRenderer;
}
