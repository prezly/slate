import { NodeApi, type Location, type NodeEntry } from '@udecode/plate';

import type { MatrixRow, MatrixColumn, MatrixCell } from '../../core';
import { Matrix } from '../../core';
import type { TableNode, TableRowNode, TableCellNode } from '../../nodes';
import { TablesEditor } from '../../TablesEditor';

export class Traverse {
    public matrix: Matrix;
    public activeRow: MatrixRow;
    public activeColumn: MatrixColumn;
    public activeCell: MatrixCell;

    private constructor(
        matrix: Matrix,
        activeRow: MatrixRow,
        activeColumn: MatrixColumn,
        activeCell: MatrixCell,
    ) {
        this.matrix = matrix;
        this.activeRow = activeRow;
        this.activeColumn = activeColumn;
        this.activeCell = activeCell;
    }

    static create(editor: TablesEditor, cellLocation: Location) {
        if (!TablesEditor.isTablesEditor(editor)) {
            return undefined;
        }

        const cellPath = editor.api.path(cellLocation);
        const ancestors = NodeApi.ancestors(editor, cellPath, { reverse: true });

        const cellNode = NodeApi.get(editor, cellPath);
        let currentTableEntry: NodeEntry<TableNode> | undefined = undefined;
        let currentRowEntry: NodeEntry<TableRowNode> | undefined = undefined;
        let currentCellEntry: NodeEntry<TableCellNode> | undefined =
            cellNode && editor.isTableCellNode(cellNode) ? [cellNode, cellPath] : undefined;

        for (const [node, path] of ancestors) {
            if (editor.isTableNode(node)) {
                currentTableEntry = [node, path];
            }

            if (editor.isTableRowNode(node)) {
                currentRowEntry = [node, path];
            }

            if (editor.isTableCellNode(node)) {
                currentCellEntry = [node, path];
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
                    return new Traverse(matrix, activeRow, activeColumn, activeCell);
                }
            }
        }

        return undefined;
    }
}
