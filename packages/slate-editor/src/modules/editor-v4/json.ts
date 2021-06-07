import { Coverage, OEmbedInfo } from '@prezly/sdk';
import { UploadcareImageStoragePayload, UploadcareStoragePayload } from '@prezly/uploadcare';

import { PressContact } from '../../types';

/**
 * Document nodes
 */

export interface DocumentNode {
    children: BlockNode[];
    type: 'document';
    version: string;
}

/**
 * Block nodes
 */

export type BlockNode =
    | AttachmentNode
    | ContactNode
    | CoverageNode
    | DividerNode
    | EmbedNode
    | GalleryNode
    | HeadingNode
    | ImageNode
    | ListNode
    | ParagraphNode
    | QuoteNode;

export interface AttachmentNode {
    description: string;
    file: UploadcareStoragePayload;
    type: 'attachment';
}

export interface ContactNode {
    /**
     * @deprecated Please fetch contact data in run-time using Newsroom Contacts API.
     */
    contact: PressContact;
    type: 'contact';
    uuid: PressContact['uuid'];
}

export interface CoverageNode {
    coverage: {
        id: Coverage['id'];
    };
    type: 'coverage';
    uuid: string;
}

export interface DividerNode {
    type: 'divider';
}

export interface EmbedNode {
    oembed: OEmbedInfo;
    type: 'embed';
    url: string;
    uuid: string;
}

export interface GalleryNode {
    images: {
        /** empty string if no caption */
        caption: string;
        file: UploadcareImageStoragePayload;
    }[];
    layout: ImageLayout;
    padding: 'S' | 'M' | 'L';
    thumbnail_size: 'XS' | 'S' | 'M' | 'L' | 'XL';
    type: 'gallery';
    uuid: string;
}

export interface HeadingNode {
    children: InlineNode[];
    type: 'heading-one' | 'heading-two' | 'heading-three' | 'heading-four';
}

export interface ImageNode {
    /** caption */
    children: InlineNode[];
    file: UploadcareImageStoragePayload;
    /** empty string if no URL */
    href: string;
    layout: ImageLayout;
    type: 'image-block';
    /** matches this regexp: /^\d+(\.\d+)?%$/ */
    width: string;
    /** matches this regexp: /^\d+(\.\d+)?%$/ */
    width_factor: string;
}

export interface ListNode {
    children: ListItemNode[];
    type: 'bulleted-list' | 'numbered-list';
}

export interface ListItemNode {
    children: [ListItemTextNode] | [ListItemTextNode, ListNode];
    type: 'list-item';
}

export interface ListItemTextNode {
    children: InlineNode[];
    type: 'list-item-text';
}

export interface ParagraphNode {
    children: InlineNode[];
    type: 'paragraph';
}

export interface QuoteNode {
    children: InlineNode[];
    type: 'block-quote';
}

/**
 * Inline nodes
 */

export type InlineNode = LinkNode | MentionNode | PlaceholderNode | TextNode;

export interface LinkNode {
    children: TextNode[];
    href: string;
    type: 'link';
}

export interface MentionNode {
    type: 'mention';
    user: {
        avatar_url: string;
        id: number;
        name: string;
    };
}

export interface PlaceholderNode {
    key:
        | 'contact.firstname'
        | 'contact.fullname'
        | 'contact.lastname'
        | 'contact.salutation'
        | 'publication.date'
        | 'release.shorturl'
        | 'release.url';
    type: 'placeholder';
}

/**
 * Text nodes
 */

export interface TextNode {
    bold?: boolean;
    italic?: boolean;
    subscript?: boolean;
    superscript?: boolean;
    text: string;
    underlined?: boolean;
}

/**
 * Shared types
 */

export type ImageLayout = 'contained' | 'expanded' | 'full-width';
