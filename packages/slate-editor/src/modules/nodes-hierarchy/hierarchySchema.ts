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
    isLinkNode,
    isListNode,
    isParagraphNode,
    isQuoteNode,
    isStoryBookmarkNode,
    isStoryEmbedNode,
    isVideoNode,
    ATTACHMENT_NODE_TYPE,
    BOOKMARK_NODE_TYPE,
    CONTACT_NODE_TYPE,
    COVERAGE_NODE_TYPE,
    DIVIDER_NODE_TYPE,
    EMBED_NODE_TYPE,
    GALLERY_NODE_TYPE,
    HEADING_1_NODE_TYPE,
    HEADING_2_NODE_TYPE,
    HTML_NODE_TYPE,
    IMAGE_NODE_TYPE,
    PARAGRAPH_NODE_TYPE,
    QUOTE_NODE_TYPE,
    STORY_BOOKMARK_NODE_TYPE,
    STORY_EMBED_NODE_TYPE,
    VIDEO_NODE_TYPE,
    isMentionNode,
    isPlaceholderNode,
} from '@prezly/slate-types';
import { Text } from 'slate';
import type { NodeEntry } from 'slate';

import { isImageCandidateElement } from '#extensions/image';
import { isLoaderElement, LOADER_NODE_TYPE } from '#extensions/loader';

import { convertToParagraph, liftNode, unwrapNode } from './fixers';
import { allowChildren } from './normilizers';
import { EDITOR_NODE_TYPE } from './types';
import type { NodesHierarchySchema } from './types';
import { combineFixers } from './utils';

import { IMAGE_CANDIDATE_NODE_TYPE } from '#extensions/image/constants';

/*eslint sort-keys-fix/sort-keys-fix: "error"*/
export const hierarchySchema: NodesHierarchySchema = {
    [ATTACHMENT_NODE_TYPE]: [
        allowChildren(isEmptyTextChild, combineFixers([liftNode, unwrapNode])),
    ],
    [BOOKMARK_NODE_TYPE]: [allowChildren(isEmptyTextChild, combineFixers([liftNode, unwrapNode]))],
    [CONTACT_NODE_TYPE]: [allowChildren(isEmptyTextChild, combineFixers([liftNode, unwrapNode]))],
    [COVERAGE_NODE_TYPE]: [allowChildren(isEmptyTextChild, combineFixers([liftNode, unwrapNode]))],
    [DIVIDER_NODE_TYPE]: [allowChildren(isEmptyTextChild, combineFixers([liftNode, unwrapNode]))],
    [EDITOR_NODE_TYPE]: [
        allowChildren(
            isAllowedOnTopLevel,
            combineFixers([liftNode, unwrapNode, convertToParagraph]),
        ),
    ],
    [EMBED_NODE_TYPE]: [allowChildren(isEmptyTextChild, combineFixers([liftNode, unwrapNode]))],
    [GALLERY_NODE_TYPE]: [allowChildren(isEmptyTextChild, combineFixers([liftNode, unwrapNode]))],
    [HEADING_1_NODE_TYPE]: [
        allowChildren(
            ([node]) => Text.isText(node) || isLinkNode(node),
            combineFixers([liftNode, unwrapNode]),
        ),
    ],
    [HEADING_2_NODE_TYPE]: [
        allowChildren(
            ([node]) => Text.isText(node) || isLinkNode(node),
            combineFixers([liftNode, unwrapNode]),
        ),
    ],
    [HTML_NODE_TYPE]: [allowChildren(isEmptyTextChild, combineFixers([liftNode, unwrapNode]))],
    [IMAGE_CANDIDATE_NODE_TYPE]: [
        allowChildren(isEmptyTextChild, combineFixers([liftNode, unwrapNode])),
    ],
    [IMAGE_NODE_TYPE]: [allowChildren(isEmptyTextChild, combineFixers([liftNode, unwrapNode]))],
    [LOADER_NODE_TYPE]: [allowChildren(isEmptyTextChild, combineFixers([liftNode, unwrapNode]))],
    [PARAGRAPH_NODE_TYPE]: [
        allowChildren(
            ([node]) =>
                Text.isText(node) ||
                isLinkNode(node) ||
                isMentionNode(node) ||
                isPlaceholderNode(node),
            combineFixers([liftNode, unwrapNode]),
        ),
    ],
    [QUOTE_NODE_TYPE]: [
        allowChildren(
            ([node]) => Text.isText(node) || isLinkNode(node),
            combineFixers([
                (editor, [node, path]) => isParagraphNode(node) && unwrapNode(editor, [node, path]),
                liftNode,
                unwrapNode,
            ]),
        ),
    ],
    [STORY_BOOKMARK_NODE_TYPE]: [
        allowChildren(isEmptyTextChild, combineFixers([liftNode, unwrapNode])),
    ],
    [STORY_EMBED_NODE_TYPE]: [
        allowChildren(isEmptyTextChild, combineFixers([liftNode, unwrapNode])),
    ],
    [VIDEO_NODE_TYPE]: [allowChildren(isEmptyTextChild, combineFixers([liftNode, unwrapNode]))],
};

function isAllowedOnTopLevel([node]: NodeEntry) {
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
        isListNode(node)
    );
}

function isEmptyTextChild([node]: NodeEntry) {
    return Text.isText(node) && node.text === '';
}
