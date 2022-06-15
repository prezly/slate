import {
    DocumentNode,
    AttachmentNode,
    BookmarkNode,
    ContactNode,
    CoverageNode,
    DividerNode,
    EmbedNode,
    GalleryNode,
    HeadingNode,
    HtmlNode,
    ImageNode,
    ParagraphNode,
    QuoteNode,
    StoryBookmarkNode,
    StoryEmbedNode,
    VideoNode,
    ListNode,
} from '@prezly/content-format';
import type { Node } from 'slate';

import { isImageCandidateElement } from '#extensions/image';
import { isLoaderElement } from '#extensions/loader';

import { squashNestedElement } from './fixers';
import { allowChildren } from './normilizers';
import type { NodesHierarchySchema } from './types';
import { combineFixers } from './utils';

/*eslint sort-keys-fix/sort-keys-fix: "error"*/
export const hierarchySchema: NodesHierarchySchema = {
    [DocumentNode.TYPE]: [allowChildren(isAllowedOnTopLevel, combineFixers([squashNestedElement]))],
};

// TODO: Move to content-format-js repo
function isAllowedOnTopLevel(node: Node) {
    return (
        AttachmentNode.isAttachmentNode(node) ||
        BookmarkNode.isBookmarkNode(node) ||
        ContactNode.isContactNode(node) ||
        CoverageNode.isCoverageNode(node) ||
        DividerNode.isDividerNode(node) ||
        EmbedNode.isEmbedNode(node) ||
        GalleryNode.isGalleryNode(node) ||
        HeadingNode.isHeadingNode(node) ||
        HtmlNode.isHtmlNode(node) ||
        ImageNode.isImageNode(node) ||
        isImageCandidateElement(node) ||
        isLoaderElement(node) ||
        ParagraphNode.isParagraphNode(node) ||
        QuoteNode.isQuoteNode(node) ||
        StoryBookmarkNode.isStoryBookmarkNode(node) ||
        StoryEmbedNode.isStoryEmbedNode(node) ||
        VideoNode.isVideoNode(node) ||
        ListNode.isListNode(node)
    );
}
