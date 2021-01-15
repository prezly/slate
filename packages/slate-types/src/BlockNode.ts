import AttachmentNode, { isAttachmentNode } from './AttachmentNode';
import ContactNode, { isContactNode } from './ContactNode';
import CoverageNode, { isCoverageNode } from './CoverageNode';
import DividerNode, { isDividerNode } from './DividerNode';
import EmbedNode, { isEmbedNode } from './EmbedNode';
import GalleryNode, { isGalleryNode } from './GalleryNode';
import HeadingNode, { isHeadingNode } from './HeadingNode';
import ImageNode, { isImageNode } from './ImageNode';
import ListNode, { isListNode } from './ListNode';
import ParagraphNode, { isParagraphNode } from './ParagraphNode';
import QuoteNode, { isQuoteNode } from './QuoteNode';

type BlockNode =
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

export const isBlockNode = (value: any): value is BlockNode => {
    return (
        isAttachmentNode(value) ||
        isContactNode(value) ||
        isCoverageNode(value) ||
        isDividerNode(value) ||
        isEmbedNode(value) ||
        isGalleryNode(value) ||
        isHeadingNode(value) ||
        isImageNode(value) ||
        isListNode(value) ||
        isParagraphNode(value) ||
        isQuoteNode(value)
    );
};

export default BlockNode;
