import type { NodeEntry, Path } from 'slate';

import type { Matrix, TableEditor } from '../../core';
import type { TableCellNode } from '../../nodes';

import type { GridWithSpansCell } from './createGridWithSpans';
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

    get cellLeft() {
        return this.row.cells.at(this.x - 1);
    }

    get cellRight() {
        return this.row.cells.at(this.x + 1);
    }

    get cellAbove() {
        return this.row.rowAbove?.cells.at(this.x);
    }

    get cellBelow() {
        return this.row.rowBelow?.cells.at(this.x);
    }
}
