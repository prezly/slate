import { isObject } from '../lib';

import AttachmentNode from './AttachmentNode';
import ContactNode from './ContactNode';
import CoverageNode from './CoverageNode';
import DividerNode from './DividerNode';
import DocumentNode from './DocumentNode';
import EmbedNode from './EmbedNode';
import GalleryNode from './GalleryNode';
import HeadingNode from './HeadingNode';
import ImageNode from './ImageNode';
import LinkNode from './LinkNode';
import ListNode, { ListItemNode, ListItemTextNode } from './ListNode';
import MentionNode from './MentionNode';
import ParagraphNode from './ParagraphNode';
import PlaceholderNode from './PlaceholderNode';
import QuoteNode from './QuoteNode';
import TextNode from './TextNode';

export default interface ElementNode extends Record<string, unknown> {
    children: (ElementNode | TextNode)[];
    type:
        | AttachmentNode['type']
        | ContactNode['type']
        | CoverageNode['type']
        | DividerNode['type']
        | DocumentNode['type']
        | EmbedNode['type']
        | GalleryNode['type']
        | HeadingNode['type']
        | ImageNode['type']
        | LinkNode['type']
        | ListNode['type']
        | ListItemNode['type']
        | ListItemTextNode['type']
        | MentionNode['type']
        | ParagraphNode['type']
        | PlaceholderNode['type']
        | QuoteNode['type'];
}

export const isElementNode = (value: any): value is ElementNode => {
    return isObject(value) && typeof value.type === 'string' && value.type.length > 0;
};
