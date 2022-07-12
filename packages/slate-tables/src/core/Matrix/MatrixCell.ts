import type { NodeEntry } from 'slate';

import { TableCellNode } from '../../nodes';
import { compareNumbers } from '../../utils/comparators';

import type { GridWithSpansCell } from './createGridWithSpans';
import type { Matrix } from './Matrix';
import type { MatrixColumn } from './MatrixColumn';
import type { MatrixRow } from './MatrixRow';

export class MatrixCell {
    public readonly node: NodeEntry<TableCellNode>[0];
    public readonly path: NodeEntry<TableCellNode>[1];
    public readonly matrix: Matrix;
    public readonly isVirtual: boolean;
    public readonly row: MatrixRow;
    public readonly column: MatrixColumn;
    public readonly y: number;
    public readonly x: number;

    constructor(
        gridCell: GridWithSpansCell,
        matrix: Matrix,
        row: MatrixRow,
        column: MatrixColumn,
        y: number,
        x: number,
    ) {
        this.node = gridCell.entry[0];
        this.path = gridCell.entry[1];
        this.isVirtual = gridCell.isVirtual;
        this.matrix = matrix;
        this.row = row;
        this.column = column;
        this.y = y;
        this.x = x;
    }

    get cellAbove(): MatrixCell | undefined {
        return this.column.cells[this.y - 1];
    }

    get cellBelow(): MatrixCell | undefined {
        return this.column.cells[this.y + 1];
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
