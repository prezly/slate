import set from 'lodash/set';
import type { NodeEntry } from 'slate';
import { Node, Path } from 'slate';

import type { TableNode } from '../../nodes';
import { TableRowNode, TableCellNode } from '../../nodes';
import type { TableEditor } from '../../TableEditor';

export interface GridWithSpansRow {
    entry: NodeEntry<TableRowNode>;
    cells: GridWithSpansCell[];
}

export interface GridWithSpansCell {
    entry: NodeEntry<TableCellNode>;
    virtualPathWithColumn: Path;
    virtualPathWithRow: Path;
    isVirtual: boolean;
}

export function createGridWithSpans(editor: TableEditor, [, tablePath]: NodeEntry<TableNode>) {
    const grid: GridWithSpansRow[] = [];

    const rows = Array.from(Node.children(editor, tablePath));
    let rowIdx = 0;

    rows.forEach(([row, rowPath]) => {
        if (!TableRowNode.isTableRowNode(editor, row)) {
            return;
        }

        const cells = Array.from(Node.children(editor, rowPath));
        let colIdx = 0;

        cells.forEach(([cell, cellPath]) => {
            if (!TableCellNode.isTableCellNode(editor, cell)) {
                return;
            }

            let colSpanIdx = 0;
            const cellRowspan = TableCellNode.getCellRowspan(cell);

            for (let spanIdx = rowIdx; spanIdx < rowIdx + cellRowspan; spanIdx++) {
                if (!grid[spanIdx]?.cells) {
                    grid[spanIdx] = { entry: [row, rowPath], cells: [] };
                }

                const cellColspan = TableCellNode.getCellColspan(cell);

                for (colSpanIdx = 0; colSpanIdx < cellColspan; colSpanIdx++) {
                    // Insert cell at first empty position
                    let i = 0;

                    while (grid[spanIdx]?.cells[colIdx + colSpanIdx + i]) {
                        i++;
                    }

                    const fakeCell = colSpanIdx > 0 || spanIdx !== rowIdx;

                    const y = spanIdx;
                    const x = colIdx + colSpanIdx + i;

                    const rowPathIndex = Path.parent(cellPath).pop() ?? 0;
                    const nodePath = cellPath.slice().pop() ?? 0;

                    const matrixCell: GridWithSpansCell = {
                        entry: [cell, cellPath],
                        isVirtual: fakeCell,
                        virtualPathWithColumn: [...tablePath, rowPathIndex, x],
                        virtualPathWithRow: [
                            ...tablePath,
                            y,
                            fakeCell ? Math.max(nodePath - cellColspan, 0) : nodePath,
                        ],
                    };

                    set(grid, [y, 'entry'], [row, rowPath]);
                    set(grid, [y, 'cells', x], matrixCell);
                }
            }

            colIdx += colSpanIdx;
        });

        rowIdx += 1;
    });

    return grid;
}
