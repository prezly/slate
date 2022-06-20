import type { NodeEntry } from 'slate';

import { TableCellNode } from '../../nodes';
import type { TableEditor } from '../../TableEditor';
import { compareNumbers } from '../../utils/comparators';

import type { GridWithSpansCell } from './createGridWithSpans';
import type { Matrix } from './Matrix';
import type { MatrixRow } from './MatrixRow';

export class MatrixCell {
    public readonly node: NodeEntry<TableCellNode>[0];
    public readonly path: NodeEntry<TableCellNode>[1];
    public readonly matrix: Matrix;
    public readonly isVirtual: boolean;
    public readonly row: MatrixRow;

    constructor(_editor: TableEditor, gridCell: GridWithSpansCell, row: MatrixRow, matrix: Matrix) {
        this.node = gridCell.entry[0];
        this.path = gridCell.entry[1];
        this.isVirtual = gridCell.isVirtual;
        this.row = row;
        this.matrix = matrix;
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
