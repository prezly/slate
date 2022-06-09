import type {
    AttachmentNode,
    ContactNode,
    CoverageNode,
    DividerNode,
    DocumentNode,
    EmbedNode,
    GalleryNode,
    HeadingNode,
    ImageNode,
    LinkNode,
    ListNode,
    ListItemNode,
    ListItemTextNode,
    MentionNode,
    ParagraphNode,
    PlaceholderNode,
    QuoteNode,
    TextNode,
} from '@prezly/slate-types';
import {
    isAttachmentNode,
    isContactNode,
    isCoverageNode,
    isDividerNode,
    isDocumentNode,
    isEmbedNode,
    isGalleryNode,
    isHeadingNode,
    isImageNode,
    isLinkNode,
    isListNode,
    isListItemNode,
    isListItemTextNode,
    isMentionNode,
    isParagraphNode,
    isPlaceholderNode,
    isQuoteNode,
} from '@prezly/slate-types';
import { Element, Node, Text } from 'slate';

const validators = [
    isAttachmentNode,
    isContactNode,
    isCoverageNode,
    isDividerNode,
    isDocumentNode,
    isEmbedNode,
    isGalleryNode,
    isHeadingNode,
    isImageNode,
    isLinkNode,
    isListNode,
    isListItemNode,
    isListItemTextNode,
    isMentionNode,
    isParagraphNode,
    isPlaceholderNode,
    isQuoteNode,
    Text.isText,
];

type KnownNode =
    | AttachmentNode
    | ContactNode
    | CoverageNode
    | DividerNode
    | DocumentNode
    | EmbedNode
    | GalleryNode
    | HeadingNode
    | ImageNode
    | LinkNode
    | ListNode
    | ListItemNode
    | ListItemTextNode
    | MentionNode
    | ParagraphNode
    | PlaceholderNode
    | QuoteNode
    | TextNode;

export type Fragment = KnownNode[];

function isKnownNode(node: unknown): node is KnownNode {
    return validators.some((validator) => {
        const isKnown = validator(node);

        if (Element.isElement(node)) {
            return isKnown && isFragment(node.children);
        }

        return isKnown;
    });
}

/**
 * Checks recurively whether all nodes in the fragment (Node[]) are "known" nodes.
 * It does not validate schema/hierarchy.
 */
export function isFragment(value: unknown): value is Fragment {
    if (!Node.isNodeList(value)) {
        return false;
    }

    return value.length > 0 && value.every(isKnownNode);
}
