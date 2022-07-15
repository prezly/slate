import { TablesEditor } from '@prezly/slate-tables';
import {
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
    [ATTACHMENT_NODE_TYPE]: [allowChildren(isEmptyTextNode, liftNodeNoSplit)],
    [BOOKMARK_NODE_TYPE]: [allowChildren(isEmptyTextNode, liftNodeNoSplit)],
    [CONTACT_NODE_TYPE]: [allowChildren(isEmptyTextNode, liftNodeNoSplit)],
    [COVERAGE_NODE_TYPE]: [allowChildren(isEmptyTextNode, liftNodeNoSplit)],
    [DIVIDER_NODE_TYPE]: [allowChildren(isEmptyTextNode, liftNodeNoSplit)],
    [EDITOR_NODE_TYPE]: [
        allowChildren(
            isAllowedOnTopLevel,
            combineFixers([unwrapSameTypeChild, liftNodeNoSplit, convertToParagraph]),
        ),
    ],
    [EMBED_NODE_TYPE]: [allowChildren(isEmptyTextNode, liftNodeNoSplit)],
    [GALLERY_NODE_TYPE]: [allowChildren(isEmptyTextNode, liftNodeNoSplit)],
    [HEADING_1_NODE_TYPE]: [
        allowChildren(isInlineNode, combineFixers([unwrapSameTypeChild, liftNodeWithSplit])),
    ],
    [HEADING_2_NODE_TYPE]: [
        allowChildren(isInlineNode, combineFixers([unwrapSameTypeChild, liftNodeWithSplit])),
    ],
    [HTML_NODE_TYPE]: [allowChildren(isEmptyTextNode, liftNodeNoSplit)],
    [IMAGE_CANDIDATE_NODE_TYPE]: [allowChildren(isEmptyTextNode, liftNodeNoSplit)],
    [IMAGE_NODE_TYPE]: [
        allowChildren(Text.isText, combineFixers([unwrapSameTypeChild, liftNodeNoSplit])),
    ],
    [LOADER_NODE_TYPE]: [allowChildren(isEmptyTextNode, liftNodeNoSplit)],
    [PARAGRAPH_NODE_TYPE]: [
        allowChildren(isInlineNode, combineFixers([unwrapSameTypeChild, liftNodeWithSplit])),
    ],
    [QUOTE_NODE_TYPE]: [allowChildren(isInlineNode, combineFixers([unwrapNode, liftNodeNoSplit]))],
    [STORY_BOOKMARK_NODE_TYPE]: [allowChildren(isEmptyTextNode, liftNodeNoSplit)],
    [STORY_EMBED_NODE_TYPE]: [allowChildren(isEmptyTextNode, liftNodeNoSplit)],
    [TABLE_CELL_NODE_TYPE]: [
        allowChildren(
            isAllowedInTableCell,
            combineFixers([unwrapSameTypeChild, liftNodeNoSplit, convertToParagraph]),
        ),
    ],
    [TABLE_NODE_TYPE]: [
        allowChildren(isTableRowNode, combineFixers([unwrapSameTypeChild, liftNodeNoSplit])),
    ],
    [TABLE_ROW_NODE_TYPE]: [
        allowChildren(
            isTableCellNode,
            combineFixers([unwrapSameTypeChild, liftNodeNoSplit, convertToParagraph]),
        ),
    ],
    [TEXT_NODE_TYPE]: [
        disallowMark(
            'bold',
            isDescendantOf(
                (_, path, editor) =>
                    TablesEditor.isTablesEditor(editor) && TablesEditor.isHeaderCell(editor, path),
            ),
        ),
    ],
    [VIDEO_NODE_TYPE]: [allowChildren(isEmptyTextNode, liftNodeNoSplit)],
};
