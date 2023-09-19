import { TablesEditor } from '@prezly/slate-tables';
import {
    ATTACHMENT_NODE_TYPE,
    CONTACT_NODE_TYPE,
    COVERAGE_NODE_TYPE,
    DIVIDER_NODE_TYPE,
    GALLERY_NODE_TYPE,
    HEADING_1_NODE_TYPE,
    HEADING_2_NODE_TYPE,
    HTML_NODE_TYPE,
    IMAGE_NODE_TYPE,
    PARAGRAPH_NODE_TYPE,
    QUOTE_NODE_TYPE,
    STORY_BOOKMARK_NODE_TYPE,
    STORY_EMBED_NODE_TYPE,
    VideoNode,
    TABLE_NODE_TYPE,
    isTableRowNode,
    TABLE_ROW_NODE_TYPE,
    TABLE_CELL_NODE_TYPE,
    isTableCellNode,
    BookmarkNode,
} from '@prezly/slate-types';
import { Text, Transforms } from 'slate';

import { EmbedNode } from '#extensions/embed';
import { LOADER_NODE_TYPE } from '#extensions/loader';

import * as fixers from './fixers';
import { allowChildren, disallowMark, mustHaveChildren, removeWhenNoChildren } from './normilizers';
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

/*eslint sort-keys-fix/sort-keys-fix: "error"*/
export const hierarchySchema: NodesHierarchySchema = {
    [ATTACHMENT_NODE_TYPE]: [allowChildren(isEmptyTextNode, fixers.liftNodeNoSplit)],
    [BookmarkNode.TYPE]: [allowChildren(isEmptyTextNode, fixers.liftNodeNoSplit)],
    [CONTACT_NODE_TYPE]: [allowChildren(isEmptyTextNode, fixers.liftNodeNoSplit)],
    [COVERAGE_NODE_TYPE]: [allowChildren(isEmptyTextNode, fixers.liftNodeNoSplit)],
    [DIVIDER_NODE_TYPE]: [allowChildren(isEmptyTextNode, fixers.liftNodeNoSplit)],
    [EDITOR_NODE_TYPE]: [
        mustHaveChildren((editor, [node, path]) => {
            const isFixed = fixers.insertParagraph(editor, [node, path]);
            if (isFixed) {
                Transforms.select(editor, path);
            }

            return isFixed;
        }),
        allowChildren(
            isAllowedOnTopLevel,
            combineFixers([
                fixers.unwrapSameTypeChild,
                fixers.liftNodeNoSplit,
                fixers.wrapSiblingTextNodesIntoParagraph,
                fixers.convertToParagraph,
            ]),
        ),
    ],
    [EmbedNode.TYPE]: [allowChildren(isEmptyTextNode, fixers.liftNodeNoSplit)],
    [GALLERY_NODE_TYPE]: [allowChildren(isEmptyTextNode, fixers.liftNodeNoSplit)],
    [HEADING_1_NODE_TYPE]: [
        allowChildren(
            isInlineNode,
            combineFixers([fixers.unwrapSameTypeChild, fixers.liftNodeWithSplit]),
        ),
    ],
    [HEADING_2_NODE_TYPE]: [
        allowChildren(
            isInlineNode,
            combineFixers([fixers.unwrapSameTypeChild, fixers.liftNodeWithSplit]),
        ),
    ],
    [HTML_NODE_TYPE]: [allowChildren(isEmptyTextNode, fixers.liftNodeNoSplit)],
    [IMAGE_NODE_TYPE]: [
        allowChildren(
            Text.isText,
            combineFixers([
                fixers.unwrapImageNodeChild,
                fixers.unwrapSameTypeChild,
                fixers.liftNodeNoSplit,
            ]),
        ),
    ],
    [LOADER_NODE_TYPE]: [allowChildren(isEmptyTextNode, fixers.liftNodeNoSplit)],
    [PARAGRAPH_NODE_TYPE]: [
        allowChildren(
            isInlineNode,
            combineFixers([fixers.unwrapSameTypeChild, fixers.liftNodeWithSplit]),
        ),
    ],
    [QUOTE_NODE_TYPE]: [
        allowChildren(isInlineNode, combineFixers([fixers.unwrapNode, fixers.liftNodeNoSplit])),
    ],
    [STORY_BOOKMARK_NODE_TYPE]: [allowChildren(isEmptyTextNode, fixers.liftNodeNoSplit)],
    [STORY_EMBED_NODE_TYPE]: [allowChildren(isEmptyTextNode, fixers.liftNodeNoSplit)],
    [TABLE_CELL_NODE_TYPE]: [
        mustHaveChildren(fixers.insertParagraph),
        allowChildren(
            isAllowedInTableCell,
            combineFixers([
                fixers.unwrapTableNodeChild,
                fixers.unwrapSameTypeChild,
                (editor, [node, path]) =>
                    isInlineNode(node) ? false : fixers.liftNodeNoSplit(editor, [node, path]),
                fixers.convertToParagraph,
            ]),
        ),
    ],
    [TABLE_NODE_TYPE]: [
        removeWhenNoChildren(),
        allowChildren(
            isTableRowNode,
            combineFixers([fixers.unwrapSameTypeChild, fixers.liftNodeNoSplit]),
        ),
    ],
    [TABLE_ROW_NODE_TYPE]: [
        removeWhenNoChildren(),
        allowChildren(
            isTableCellNode,
            combineFixers([
                fixers.unwrapSameTypeChild,
                fixers.liftNodeNoSplit,
                fixers.convertToParagraph,
            ]),
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
    [VideoNode.TYPE]: [allowChildren(isEmptyTextNode, fixers.liftNodeNoSplit)],
};
