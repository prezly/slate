import type { Editor, Location } from 'slate';
import { Path, Transforms } from 'slate';

import { Traverse } from '../core';
import { TableCellNode, TableRowNode } from '../nodes';
import type { CellSides } from '../utils/types';

export function splitCell(
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

    const { activeCell, activeColumn, activeRow } = traverse;

    if (side === 'left' || side === 'right') {
        const at = side === 'left' ? activeCell.nodePath : Path.next(activeCell.nodePath);

        Transforms.insertNodes(editor, TableCellNode.createTableCellNode(editor), { at });

        activeColumn.cells.forEach((matrixCell) => {
            if (matrixCell.node === activeCell.node) {
                return;
            }

            TableCellNode.update(
                editor,
                { colspan: TableCellNode.calculateCellColSpan(activeCell.node, '+', 1) },
                matrixCell.nodePath,
            );
        });

        return true;
    }

    if (side === 'bellow') {
        const at = Path.next(activeRow.path);

        Transforms.insertNodes(editor, TableRowNode.createTableRowNode(editor), { at });

        activeRow.cells.forEach((matrixCell) => {
            TableCellNode.update(
                editor,
                { rowspan: TableCellNode.calculateCellRowSpan(matrixCell.node, '+', 1) },
                matrixCell.nodePath,
            );
        });

        return true;
    }

    if (side === 'above') {
        if (activeRow.isFirst) {
            const childrenWithNewEmptyCell = activeRow.node.children.map((c) =>
                c === activeCell.node
                    ? TableCellNode.createTableCellNode(editor, { ...c, rowspan: 1 })
                    : TableCellNode.createTableCellNode(
                          editor,
                          { ...c, rowspan: TableCellNode.calculateCellRowSpan(c, '+', 1) },
                          c.children,
                      ),
            );

            const rowWithEmptyCell = TableRowNode.createTableRowNode(
                editor,
                {},
                childrenWithNewEmptyCell,
            );
            const rowWithCurrentCellContent = TableRowNode.createTableRowNode(editor, {}, [
                activeCell.node,
            ]);

            Transforms.removeNodes(editor, { at: activeRow.path });
            Transforms.insertNodes(editor, [rowWithEmptyCell, rowWithCurrentCellContent], {
                at: activeRow.path,
            });
        } else {
            activeRow.cells.forEach((c) => {
                if (c.node !== activeCell.node) {
                    TableCellNode.update(
                        editor,
                        { rowspan: TableCellNode.calculateCellRowSpan(c.node, '+', 1) },
                        c.nodePath,
                    );
                }
            });

            Transforms.insertNodes(
                editor,
                TableRowNode.createTableRowNode(editor, {}, [
                    TableCellNode.createTableCellNode(editor, { ...activeCell.node, rowspan: 1 }),
                ]),
                { at: activeRow.path },
            );
        }

        return true;
    }

    return false;
}
