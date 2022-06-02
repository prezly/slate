import type { Location } from 'slate';
import { Editor } from 'slate';
import { Transforms } from 'slate';

import { Traverse } from '../core';
import { TableCellNode } from '../nodes';
import type { CellSides } from '../utils/types';

export function mergeCell(
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
        const otherCell = side === 'above' ? activeCell.cellAbove : activeCell.cellBelow;

        if (!otherCell) {
            return false;
        }

        if (activeCell.compareWidth(otherCell) !== 0) {
            return false;
        }

        if (side === 'above') {
            const endOfAboveCell = Editor.end(editor, otherCell.nodePath);
            Transforms.insertNodes(editor, activeCell.node.children, { at: endOfAboveCell });

            TableCellNode.update(
                editor,
                {
                    rowspan: TableCellNode.calculateCellRowSpan(
                        otherCell.node,
                        '+',
                        TableCellNode.getCellRowspan(activeCell.node),
                    ),
                },
                otherCell.nodePath,
            );

            editor.focusEditor(editor);
            Transforms.select(editor, endOfAboveCell);

            Transforms.removeNodes(editor, { at: activeCell.nodePath });
        } else {
            const endOfActiveCell = Editor.end(editor, activeCell.nodePath);
            Transforms.insertNodes(editor, otherCell.node.children, { at: endOfActiveCell });

            TableCellNode.update(
                editor,
                {
                    rowspan: TableCellNode.calculateCellRowSpan(
                        activeCell.node,
                        '+',
                        TableCellNode.getCellRowspan(otherCell.node),
                    ),
                },
                activeCell.nodePath,
            );

            editor.focusEditor(editor);
            Transforms.select(editor, endOfActiveCell);

            Transforms.removeNodes(editor, { at: otherCell.nodePath });
        }
    }

    if (side === 'left' || side === 'right') {
        const otherCell = side === 'left' ? activeCell.cellLeft : activeCell.cellRight;

        if (!otherCell) {
            return false;
        }

        if (activeCell.compareHeight(otherCell) !== 0) {
            return false;
        }

        if (side === 'left') {
            const endOfLeftCell = Editor.end(editor, otherCell.nodePath);
            Transforms.insertNodes(editor, activeCell.node.children, { at: endOfLeftCell });

            TableCellNode.update(
                editor,
                {
                    colspan: TableCellNode.calculateCellColSpan(
                        otherCell.node,
                        '+',
                        TableCellNode.getCellColspan(activeCell.node),
                    ),
                },
                otherCell.nodePath,
            );

            editor.focusEditor(editor);
            Transforms.select(editor, endOfLeftCell);

            Transforms.removeNodes(editor, { at: activeCell.nodePath });
        } else {
            const endOfActiveCell = Editor.end(editor, activeCell.nodePath);
            Transforms.insertNodes(editor, otherCell.node.children, { at: endOfActiveCell });

            TableCellNode.update(
                editor,
                {
                    colspan: TableCellNode.calculateCellColSpan(
                        activeCell.node,
                        '+',
                        TableCellNode.getCellColspan(otherCell.node),
                    ),
                },
                activeCell.nodePath,
            );

            editor.focusEditor(editor);
            Transforms.select(editor, endOfActiveCell);

            Transforms.removeNodes(editor, { at: otherCell.nodePath });
        }
    }

    return false;
}
