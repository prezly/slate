import {
    AttachmentNode,
    isAttachmentNode,
    ContactNode,
    isContactNode,
    CoverageNode,
    isCoverageNode,
    DividerNode,
    isDividerNode,
    DocumentNode,
    isDocumentNode,
    EmbedNode,
    isEmbedNode,
    GalleryNode,
    isGalleryNode,
    HeadingNode,
    isHeadingNode,
    ImageNode,
    isImageNode,
    LinkNode,
    isLinkNode,
    ListNode,
    isListNode,
    isListItemNode,
    isListItemTextNode,
    ListItemNode,
    ListItemTextNode,
    MentionNode,
    isMentionNode,
    ParagraphNode,
    isParagraphNode,
    PlaceholderNode,
    isPlaceholderNode,
    QuoteNode,
    isQuoteNode,
    TextNode,
    isTextNode,
} from '@prezly/slate-types';
import { Element, Node } from 'slate';

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
    isTextNode,
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

type Fragment = KnownNode[];

const isKnownNode = (node: unknown): node is KnownNode => {
    return validators.some((validator) => {
        const isKnown = validator(node);

        if (Element.isElement(node)) {
            return isKnown && isFragment(node.children);
        }

        return isKnown;
    });
};

/**
 * Checks recurively whether all nodes in the fragment (Node[]) are "known" nodes.
 * It does not validate schema/hierarchy.
 */
export const isFragment = (value: unknown): value is Fragment => {
    if (!Node.isNodeList(value)) {
        return false;
    }

    return value.length > 0 && value.every(isKnownNode);
};

export default Fragment;
