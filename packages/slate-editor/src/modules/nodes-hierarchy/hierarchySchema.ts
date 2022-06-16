import {
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
import { Text } from 'slate';
import type { NodeEntry } from 'slate';

import { isImageCandidateElement } from '#extensions/image';
import { isLoaderElement } from '#extensions/loader';

import { convertToParagraph, squashNestedElement } from './fixers';
import { allowChildren } from './normilizers';
import { EditorRootNode } from './types';
import type { NodesHierarchySchema } from './types';
import { combineFixers } from './utils';

/*eslint sort-keys-fix/sort-keys-fix: "error"*/
export const hierarchySchema: NodesHierarchySchema = {
    [EditorRootNode]: [
        allowChildren(
            isAllowedOnTopLevel,
            combineFixers([squashNestedElement, convertToParagraph]),
        ),
    ],
    [ParagraphNode.TYPE]: [allowChildren(Text.isText, combineFixers([squashNestedElement]))],
};

function isAllowedOnTopLevel([node]: NodeEntry) {
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
