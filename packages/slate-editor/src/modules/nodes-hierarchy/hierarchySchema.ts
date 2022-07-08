import { TablesEditor } from '@prezly/slate-tables';
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
    liftNodeWithSplit,
    liftNodeNoSplit,
    unwrapSameTypeChild,
    unwrapNode,
} from './fixers';
import { allowChildren, disallowMark } from './normilizers';
import {
    isAllowedInTableCell,
    isAllowedOnTopLevel,
    isEmptyTextNode,
    isInlineNode,
    isDescendantOf,
} from './queries';
import { EDITOR_NODE_TYPE, TEXT_NODE_TYPE } from './types';
import type { NodesHierarchySchema } from './types';
import { combineFixers } from './utils';

import { IMAGE_CANDIDATE_NODE_TYPE } from '#extensions/image/constants';

/*eslint sort-keys-fix/sort-keys-fix: "error"*/
export const hierarchySchema: NodesHierarchySchema = {
    [ATTACHMENT_NODE_TYPE]: [
        allowChildren(
            isEmptyTextNode,
            combineFixers([unwrapSameTypeChild, liftNodeWithSplit, unwrapNode]),
        ),
    ],
    [BOOKMARK_NODE_TYPE]: [
        allowChildren(
            isEmptyTextNode,
            combineFixers([unwrapSameTypeChild, liftNodeWithSplit, unwrapNode]),
        ),
    ],
    [CONTACT_NODE_TYPE]: [
        allowChildren(
            isEmptyTextNode,
            combineFixers([unwrapSameTypeChild, liftNodeWithSplit, unwrapNode]),
        ),
    ],
    [COVERAGE_NODE_TYPE]: [
        allowChildren(
            isEmptyTextNode,
            combineFixers([unwrapSameTypeChild, liftNodeWithSplit, unwrapNode]),
        ),
    ],
    [DIVIDER_NODE_TYPE]: [
        allowChildren(
            isEmptyTextNode,
            combineFixers([unwrapSameTypeChild, liftNodeWithSplit, unwrapNode]),
        ),
    ],
    [EDITOR_NODE_TYPE]: [
        allowChildren(
            isAllowedOnTopLevel,
            combineFixers([unwrapSameTypeChild, liftNodeWithSplit, unwrapNode, convertToParagraph]),
        ),
    ],
    [EMBED_NODE_TYPE]: [
        allowChildren(
            isEmptyTextNode,
            combineFixers([unwrapSameTypeChild, liftNodeWithSplit, unwrapNode]),
        ),
    ],
    [GALLERY_NODE_TYPE]: [
        allowChildren(
            isEmptyTextNode,
            combineFixers([unwrapSameTypeChild, liftNodeWithSplit, unwrapNode]),
        ),
    ],
    [HEADING_1_NODE_TYPE]: [
        allowChildren(
            isInlineNode,
            combineFixers([unwrapSameTypeChild, liftNodeWithSplit, unwrapNode]),
        ),
    ],
    [HEADING_2_NODE_TYPE]: [
        allowChildren(
            isInlineNode,
            combineFixers([unwrapSameTypeChild, liftNodeWithSplit, unwrapNode]),
        ),
    ],
    [HTML_NODE_TYPE]: [
        allowChildren(
            isEmptyTextNode,
            combineFixers([unwrapSameTypeChild, liftNodeWithSplit, unwrapNode]),
        ),
    ],
    [IMAGE_CANDIDATE_NODE_TYPE]: [
        allowChildren(
            isEmptyTextNode,
            combineFixers([unwrapSameTypeChild, liftNodeWithSplit, unwrapNode]),
        ),
    ],
    [IMAGE_NODE_TYPE]: [
        allowChildren(
            Text.isText,
            combineFixers([unwrapSameTypeChild, liftNodeWithSplit, unwrapNode]),
        ),
    ],
    [LOADER_NODE_TYPE]: [
        allowChildren(
            isEmptyTextNode,
            combineFixers([unwrapSameTypeChild, liftNodeWithSplit, unwrapNode]),
        ),
    ],
    [PARAGRAPH_NODE_TYPE]: [
        allowChildren(
            isInlineNode,
            combineFixers([unwrapSameTypeChild, liftNodeWithSplit, unwrapNode]),
        ),
    ],
    [QUOTE_NODE_TYPE]: [
        allowChildren(
            isInlineNode,
            combineFixers([
                (editor, [node, path]) => isParagraphNode(node) && unwrapNode(editor, [node, path]),
                unwrapSameTypeChild,
                liftNodeWithSplit,
                unwrapNode,
            ]),
        ),
    ],
    [STORY_BOOKMARK_NODE_TYPE]: [
        allowChildren(
            isEmptyTextNode,
            combineFixers([unwrapSameTypeChild, liftNodeWithSplit, unwrapNode]),
        ),
    ],
    [STORY_EMBED_NODE_TYPE]: [
        allowChildren(
            isEmptyTextNode,
            combineFixers([unwrapSameTypeChild, liftNodeWithSplit, unwrapNode]),
        ),
    ],
    [TABLE_CELL_NODE_TYPE]: [
        allowChildren(
            isAllowedInTableCell,
            combineFixers([unwrapSameTypeChild, liftNodeNoSplit, unwrapNode, convertToParagraph]),
        ),
    ],
    [TABLE_NODE_TYPE]: [
        allowChildren(
            isTableRowNode,
            combineFixers([unwrapSameTypeChild, liftNodeNoSplit, unwrapNode]),
        ),
    ],
    [TABLE_ROW_NODE_TYPE]: [
        allowChildren(
            isTableCellNode,
            combineFixers([unwrapSameTypeChild, liftNodeNoSplit, unwrapNode, convertToParagraph]),
        ),
    ],
    [TEXT_NODE_TYPE]: [
        disallowMark(
            'bold',
            isDescendantOf((_, path, editor) => TablesEditor.isHeaderCell(editor, path)),
        ),
    ],
    [VIDEO_NODE_TYPE]: [
        allowChildren(
            isEmptyTextNode,
            combineFixers([unwrapSameTypeChild, liftNodeWithSplit, unwrapNode]),
        ),
    ],
};
