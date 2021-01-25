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
    ElementNode,
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

export type Node = BlockNode | InlineNode | TextNode;

export type Render<T extends ElementNode> = FunctionComponent<{ node: T }>;

export type RenderText = FunctionComponent<TextNode & { children?: never }>;

export interface Options {
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
    text?: RenderText;
}
