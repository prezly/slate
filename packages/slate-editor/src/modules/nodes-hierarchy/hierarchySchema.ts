import {
    isParagraphNode,
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
    TABLE_NODE_TYPE,
    isTableRowNode,
    TABLE_ROW_NODE_TYPE,
    TABLE_CELL_NODE_TYPE,
    isTableCellNode,
} from '@prezly/slate-types';
import { Text } from 'slate';

import { LOADER_NODE_TYPE } from '#extensions/loader';

import {
    convertToParagraph,
    liftNode,
    unwrapSameTypeChild,
    unwrapNode,
    optimizeTextInsideTableCell,
} from './fixers';
import { allowChildren, isInside } from './normilizers';
import {
    isAllowedInTableCell,
    isAllowedOnTopLevel,
    isEmptyTextNode,
    isInlineNode,
} from './queries';
import { EDITOR_NODE_TYPE, TEXT_NODE_TYPE } from './types';
import type { NodesHierarchySchema } from './types';
import { combineFixers } from './utils';

import { IMAGE_CANDIDATE_NODE_TYPE } from '#extensions/image/constants';

/*eslint sort-keys-fix/sort-keys-fix: "error"*/
export const hierarchySchema: NodesHierarchySchema = {
    [ATTACHMENT_NODE_TYPE]: [
        allowChildren(isEmptyTextNode, combineFixers([unwrapSameTypeChild, liftNode, unwrapNode])),
    ],
    [BOOKMARK_NODE_TYPE]: [
        allowChildren(isEmptyTextNode, combineFixers([unwrapSameTypeChild, liftNode, unwrapNode])),
    ],
    [CONTACT_NODE_TYPE]: [
        allowChildren(isEmptyTextNode, combineFixers([unwrapSameTypeChild, liftNode, unwrapNode])),
    ],
    [COVERAGE_NODE_TYPE]: [
        allowChildren(isEmptyTextNode, combineFixers([unwrapSameTypeChild, liftNode, unwrapNode])),
    ],
    [DIVIDER_NODE_TYPE]: [
        allowChildren(isEmptyTextNode, combineFixers([unwrapSameTypeChild, liftNode, unwrapNode])),
    ],
    [EDITOR_NODE_TYPE]: [
        allowChildren(
            isAllowedOnTopLevel,
            combineFixers([unwrapSameTypeChild, liftNode, unwrapNode, convertToParagraph]),
        ),
    ],
    [EMBED_NODE_TYPE]: [
        allowChildren(isEmptyTextNode, combineFixers([unwrapSameTypeChild, liftNode, unwrapNode])),
    ],
    [GALLERY_NODE_TYPE]: [
        allowChildren(isEmptyTextNode, combineFixers([unwrapSameTypeChild, liftNode, unwrapNode])),
    ],
    [HEADING_1_NODE_TYPE]: [
        allowChildren(isInlineNode, combineFixers([unwrapSameTypeChild, liftNode, unwrapNode])),
    ],
    [HEADING_2_NODE_TYPE]: [
        allowChildren(isInlineNode, combineFixers([unwrapSameTypeChild, liftNode, unwrapNode])),
    ],
    [HTML_NODE_TYPE]: [
        allowChildren(isEmptyTextNode, combineFixers([unwrapSameTypeChild, liftNode, unwrapNode])),
    ],
    [IMAGE_CANDIDATE_NODE_TYPE]: [
        allowChildren(isEmptyTextNode, combineFixers([unwrapSameTypeChild, liftNode, unwrapNode])),
    ],
    [IMAGE_NODE_TYPE]: [
        allowChildren(Text.isText, combineFixers([unwrapSameTypeChild, liftNode, unwrapNode])),
    ],
    [LOADER_NODE_TYPE]: [
        allowChildren(isEmptyTextNode, combineFixers([unwrapSameTypeChild, liftNode, unwrapNode])),
    ],
    [PARAGRAPH_NODE_TYPE]: [
        allowChildren(isInlineNode, combineFixers([unwrapSameTypeChild, liftNode, unwrapNode])),
    ],
    [QUOTE_NODE_TYPE]: [
        allowChildren(
            isInlineNode,
            combineFixers([
                (editor, [node, path]) => isParagraphNode(node) && unwrapNode(editor, [node, path]),
                unwrapSameTypeChild,
                liftNode,
                unwrapNode,
            ]),
        ),
    ],
    [STORY_BOOKMARK_NODE_TYPE]: [
        allowChildren(isEmptyTextNode, combineFixers([unwrapSameTypeChild, liftNode, unwrapNode])),
    ],
    [STORY_EMBED_NODE_TYPE]: [
        allowChildren(isEmptyTextNode, combineFixers([unwrapSameTypeChild, liftNode, unwrapNode])),
    ],
    [TABLE_CELL_NODE_TYPE]: [
        allowChildren(
            isAllowedInTableCell,
            combineFixers([unwrapSameTypeChild, liftNode, unwrapNode, convertToParagraph]),
        ),
    ],
    [TABLE_NODE_TYPE]: [
        allowChildren(
            isTableRowNode,
            combineFixers([
                unwrapSameTypeChild,
                (editor, entry) => liftNode(editor, entry, true),
                unwrapNode,
            ]),
        ),
    ],
    [TABLE_ROW_NODE_TYPE]: [
        allowChildren(
            isTableCellNode,
            combineFixers([unwrapSameTypeChild, liftNode, unwrapNode, convertToParagraph]),
        ),
    ],
    [TEXT_NODE_TYPE]: [isInside(isTableCellNode, optimizeTextInsideTableCell)],
    [VIDEO_NODE_TYPE]: [
        allowChildren(isEmptyTextNode, combineFixers([unwrapSameTypeChild, liftNode, unwrapNode])),
    ],
};
