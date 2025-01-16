import {
    BookmarkNode,
    CalloutNode,
    isAttachmentNode,
    isContactNode,
    isCoverageNode,
    isDividerNode,
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
    VideoNode,
} from '@prezly/slate-types';
import type { TNode } from '@udecode/plate-common';
import type { Node } from 'slate';

import { ButtonBlockNode } from '#extensions/button-block';
import { EmbedNode } from '#extensions/embed';
import { PlaceholderNode } from '#extensions/placeholders';

export function isAllowedOnTopLevel(node: Node | TNode) {
    return (
        BookmarkNode.isBookmarkNode(node) ||
        isAttachmentNode(node) ||
        isContactNode(node) ||
        isCoverageNode(node) ||
        ButtonBlockNode.isButtonBlockNode(node) ||
        CalloutNode.isCalloutNode(node) ||
        isDividerNode(node) ||
        EmbedNode.isEmbedNode(node) ||
        isGalleryNode(node) ||
        isHeadingNode(node) ||
        isHtmlNode(node) ||
        isImageNode(node) ||
        isParagraphNode(node) ||
        PlaceholderNode.isPlaceholderNode(node) ||
        isQuoteNode(node) ||
        isStoryBookmarkNode(node) ||
        isStoryEmbedNode(node) ||
        VideoNode.isVideoNode(node) ||
        isListNode(node) ||
        isTableNode(node)
    );
}
