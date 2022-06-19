import type { Location, NodeEntry } from 'slate';
import { Editor, Node } from 'slate';

import type { MatrixRow, MatrixColumn, MatrixCell } from '../../core';
import { Matrix } from '../../core';
import { TableNode, TableRowNode, TableCellNode } from '../../nodes';
import type { TableEditor } from '../../TableEditor';

export class Traverse {
    public matrix: Matrix;
    public activeRow: MatrixRow;
    public activeColumn: MatrixColumn;
    public activeCell: MatrixCell;

    // @ts-expect-error temp
    private editor: TableEditor;

    private constructor(
        editor: TableEditor,
        matrix: Matrix,
        activeRow: MatrixRow,
        activeColumn: MatrixColumn,
        activeCell: MatrixCell,
    ) {
        this.editor = editor;
        this.matrix = matrix;
        this.activeRow = activeRow;
        this.activeColumn = activeColumn;
        this.activeCell = activeCell;
    }

    static create(editor: TableEditor, cellLocation: Location) {
        const cellPath = Editor.path(editor, cellLocation);
        const ancestors = Node.ancestors(editor, cellPath, { reverse: true });

        let currentTableEntry: NodeEntry<TableNode> | undefined = undefined;
        let currentRowEntry: NodeEntry<TableRowNode> | undefined = undefined;
        let currentCellEntry: NodeEntry<TableCellNode> | undefined = undefined;

        for (const ancestor of ancestors) {
            if (TableNode.isTableNodeEntry(editor, ancestor)) {
                currentTableEntry = ancestor;
            }

            if (TableRowNode.isTableRowNodeEntry(editor, ancestor)) {
                currentRowEntry = ancestor;
            }

            if (TableCellNode.isTableCellNodeEntry(editor, ancestor)) {
                currentCellEntry = ancestor;
            }

            if (currentTableEntry && currentRowEntry && currentCellEntry) {
                const [currentRow] = currentRowEntry;
                const [currentCell] = currentCellEntry;

                let activeRow: MatrixRow | undefined = undefined;
                let activeCell: MatrixCell | undefined = undefined;
                let activeColumn: MatrixColumn | undefined = undefined;

                const matrix = new Matrix(editor, currentTableEntry);

                matrix.rows.forEach((row) => {
                    if (row.node === currentRow) {
                        activeRow = row;
                    }

                    row.cells.forEach((cell, cellIndex) => {
                        if (cell.node === currentCell && !cell.isVirtual) {
                            activeCell = cell;

                            if (!activeColumn) {
                                activeColumn = matrix.columns[cellIndex];
                            }
                        }
                    });
                });

                if (activeRow && activeColumn && activeCell) {
                    return new Traverse(editor, matrix, activeRow, activeColumn, activeCell);
                }
            }
        }

        return undefined;
    }
}
