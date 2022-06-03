import type { Location } from 'slate';
import type { Editor } from 'slate';
import { Path } from 'slate';
import { Transforms } from 'slate';

import { Traverse } from '../core';
import { TableCellNode } from '../nodes';
import type { CellSides } from '../utils/types';

export function divideCell(
    editor: Editor,
    location: Location | undefined = editor.selection ?? undefined,
    side: CellSides,
) {
    if (!location) {
        return false;
    }

    const traverse = Traverse.create(editor, location);

    if (!traverse) {
        return false;
    }

    const { activeCell } = traverse;

    if (side === 'above' || side === 'bellow') {
        const currentRowSpan = TableCellNode.getCellRowspan(activeCell.node);

        if (currentRowSpan <= 1) {
            return false;
        }

        if (side === 'above') {
            Transforms.removeNodes(editor, { at: activeCell.nodePath });
            Transforms.insertNodes(
                editor,
                [TableCellNode.createTableCellNode(editor, { ...activeCell.node, rowspan: 1 })],
                {
                    at: activeCell.nodePath,
                },
            );

            const at = activeCell.cellBelow?.virtualPathWithRow;

            Transforms.insertNodes(
                editor,
                [
                    TableCellNode.createTableCellNode(
                        editor,
                        {
                            ...activeCell.node,
                            rowspan: TableCellNode.calculateCellRowSpan(activeCell.node, '-', 1),
                        },
                        activeCell.node.children,
                    ),
                ],
                {
                    at,
                },
            );

            editor.focusEditor(editor);
        } else {
            TableCellNode.update(
                editor,
                {
                    rowspan: TableCellNode.calculateCellRowSpan(activeCell.node, '-', 1),
                },
                activeCell.nodePath,
            );

            Transforms.insertNodes(
                editor,
                [TableCellNode.createTableCellNode(editor, { ...activeCell.node, rowspan: 1 })],
                {
                    at: activeCell.cellBelowReal?.cellAbove?.virtualPathWithRow,
                },
            );

            editor.focusEditor(editor);
        }
    }

    if (side === 'left' || side === 'right') {
        const currentColSpan = TableCellNode.getCellColspan(activeCell.node);

        if (currentColSpan <= 1) {
            return false;
        }

        TableCellNode.update(
            editor,
            { colspan: TableCellNode.calculateCellColSpan(activeCell.node, '-', 1) },
            activeCell.nodePath,
        );

        if (side === 'left') {
            Transforms.insertNodes(
                editor,
                [TableCellNode.createTableCellNode(editor, { ...activeCell.node, colspan: 1 })],
                {
                    at: activeCell.nodePath,
                },
            );

            editor.focusEditor(editor);
        } else {
            Transforms.insertNodes(
                editor,
                [TableCellNode.createTableCellNode(editor, { ...activeCell.node, colspan: 1 })],
                {
                    at: Path.next(activeCell.nodePath),
                },
            );

            editor.focusEditor(editor);
        }
    }

    return false;
}
