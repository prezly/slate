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
import type { Node } from 'slate';

import { EntryPointNode } from '#extensions/entry-points';
import { isImageCandidateElement } from '#extensions/image';
import { isLoaderElement } from '#extensions/loader';

export function isAllowedOnTopLevel(node: Node) {
    return (
        isBookmarkNode(node) ||
        isAttachmentNode(node) ||
        isContactNode(node) ||
        isCoverageNode(node) ||
        isDividerNode(node) ||
        isEmbedNode(node) ||
        EntryPointNode.isEntryPoint(node) ||
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
