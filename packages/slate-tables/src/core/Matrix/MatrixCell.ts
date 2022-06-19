import type { NodeEntry, Path } from 'slate';

import { TableCellNode } from '../../nodes';
import type { TableEditor } from '../../TableEditor';
import { compareNumbers } from '../../utils/comparators';

import type { GridWithSpansCell } from './createGridWithSpans';
import type { Matrix } from './Matrix';
import type { MatrixRow } from './MatrixRow';

export class MatrixCell {
    public readonly node: NodeEntry<TableCellNode>[0];
    public readonly nodePath: NodeEntry<TableCellNode>[1];
    public readonly matrix: Matrix;
    public readonly isVirtual: boolean;
    public readonly virtualPathWithColumn: Path;
    public readonly virtualPathWithRow: Path;
    public readonly row: MatrixRow;

    // @ts-expect-error temp
    private readonly y: number;
    private readonly x: number;

    constructor(
        _editor: TableEditor,
        gridCell: GridWithSpansCell,
        y: number,
        x: number,
        row: MatrixRow,
        matrix: Matrix,
    ) {
        this.node = gridCell.entry[0];
        this.nodePath = gridCell.entry[1];
        this.isVirtual = gridCell.isVirtual;
        this.virtualPathWithColumn = gridCell.virtualPathWithColumn;
        this.virtualPathWithRow = gridCell.virtualPathWithRow;
        this.row = row;
        this.matrix = matrix;
        this.y = y;
        this.x = x;
    }

    get cellLeft(): MatrixCell | undefined {
        return this.row.cells[this.x - 1];
    }

    get cellRight(): MatrixCell | undefined {
        return this.row.cells[this.x + 1];
    }

    get cellAbove(): MatrixCell | undefined {
        return this.row.rowAbove?.cells[this.x];
    }

    get cellBelow(): MatrixCell | undefined {
        return this.row.rowBelow?.cells[this.x];
    }

    get cellBelowReal(): MatrixCell | undefined {
        const rowBelow: MatrixCell | undefined = this.row.rowBelow?.cells[this.x];

        if (rowBelow?.isVirtual) {
            return rowBelow.cellBelowReal;
        }

        return rowBelow;
    }

    compareWidth(otherCell: MatrixCell) {
        const thisRowSpan = TableCellNode.getCellColspan(this.node);
        const otherRowSpan = TableCellNode.getCellColspan(otherCell.node);

        return compareNumbers(thisRowSpan, otherRowSpan);
    }

    compareHeight(otherCell: MatrixCell) {
        const thisColSpan = TableCellNode.getCellRowspan(this.node);
        const otherColSpan = TableCellNode.getCellRowspan(otherCell.node);

        return compareNumbers(thisColSpan, otherColSpan);
    }
}
