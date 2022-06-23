import {
    isAttachmentNode,
    isBookmarkNode,
    isContactNode,
    isCoverageNode,
    isDividerNode,
    isEmbedNode,
    isGalleryNode,
    isHeadingNode,
    isHtmlNode,
    isImageNode,
    isListNode,
    isParagraphNode,
    isQuoteNode,
    isStoryBookmarkNode,
    isStoryEmbedNode,
    isTableNode,
    isVideoNode,
} from '@prezly/slate-types';
import type { NodeEntry } from 'slate';

import { isImageCandidateElement } from '#extensions/image';
import { isLoaderElement } from '#extensions/loader';

export function isAllowedOnTopLevel([node]: NodeEntry) {
    return (
        isBookmarkNode(node) ||
        isAttachmentNode(node) ||
        isContactNode(node) ||
        isCoverageNode(node) ||
        isDividerNode(node) ||
        isEmbedNode(node) ||
        isGalleryNode(node) ||
        isHeadingNode(node) ||
        isHtmlNode(node) ||
        isImageNode(node) ||
        isImageCandidateElement(node) ||
        isLoaderElement(node) ||
        isParagraphNode(node) ||
        isQuoteNode(node) ||
        isStoryBookmarkNode(node) ||
        isStoryEmbedNode(node) ||
        isVideoNode(node) ||
        isListNode(node) ||
        isTableNode(node)
    );
}
