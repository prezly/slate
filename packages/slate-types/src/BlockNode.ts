import AttachmentNode from './AttachmentNode';
import ContactNode from './ContactNode';
import CoverageNode from './CoverageNode';
import DividerNode from './DividerNode';
import EmbedNode from './EmbedNode';
import GalleryNode from './GalleryNode';
import HeadingNode from './HeadingNode';
import ImageNode from './ImageNode';
import ListNode from './ListNode';
import ParagraphNode from './ParagraphNode';
import QuoteNode from './QuoteNode';

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

export default BlockNode;
