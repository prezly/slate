import { Element, Node } from 'slate';

import AttachmentNode, { isAttachmentNode } from './AttachmentNode';
import BlockNode, { isBlockNode } from './BlockNode';
import ContactNode, { isContactNode } from './ContactNode';
import CoverageNode, { isCoverageNode } from './CoverageNode';
import DividerNode, { isDividerNode } from './DividerNode';
import DocumentNode, { isDocumentNode } from './DocumentNode';
import EmbedNode, { isEmbedNode } from './EmbedNode';
import GalleryNode, { isGalleryNode } from './GalleryNode';
import HeadingNode, { isHeadingNode } from './HeadingNode';
import ImageNode, { isImageNode } from './ImageNode';
import InlineNode, { isInlineNode } from './InlineNode';
import LinkNode, { isLinkNode } from './LinkNode';
import ListNode, {
    isListNode,
    isListItemNode,
    isListItemTextNode,
    ListItemNode,
    ListItemTextNode,
} from './ListNode';
import MentionNode, { isMentionNode } from './MentionNode';
import ParagraphNode, { isParagraphNode } from './ParagraphNode';
import PlaceholderNode, { isPlaceholderNode } from './PlaceholderNode';
import QuoteNode, { isQuoteNode } from './QuoteNode';
import TextNode, { isTextNode } from './TextNode';

const validators = [
    isAttachmentNode,
    isBlockNode,
    isContactNode,
    isCoverageNode,
    isDividerNode,
    isDocumentNode,
    isEmbedNode,
    isGalleryNode,
    isHeadingNode,
    isImageNode,
    isInlineNode,
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
    | BlockNode
    | ContactNode
    | CoverageNode
    | DividerNode
    | DocumentNode
    | EmbedNode
    | GalleryNode
    | HeadingNode
    | ImageNode
    | InlineNode
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
