import { uniqBy } from 'lodash-es';
import type { NodeEntry } from 'slate';

import type { TableRowNode } from '../../nodes';
import type { TableEditor } from '../../TableEditor';

import type { GridWithSpansRow } from './createGridWithSpans';
import type { Matrix } from './Matrix';
import { MatrixCell } from './MatrixCell';

export class MatrixRow {
    public readonly node: NodeEntry<TableRowNode>[0];
    public readonly path: NodeEntry<TableRowNode>[1];
    public readonly cells: MatrixCell[];

    private readonly y: number;
    private readonly matrix: Matrix;

    constructor(editor: TableEditor, gridRow: GridWithSpansRow, y: number, matrix: Matrix) {
        this.node = gridRow.entry[0];
        this.path = gridRow.entry[1];
        this.y = y;
        this.matrix = matrix;

        this.cells = gridRow.cells.map(
            (gridCell, x) => new MatrixCell(editor, gridCell, y, x, this, matrix),
        );
    }

    get rowAbove() {
        return this.matrix.rows[this.y - 1];
    }

    get rowBelow() {
        return this.matrix.rows[this.y + 1];
    }

    get isFirst() {
        return this.rowAbove === undefined;
    }

    get uniqCells() {
        return uniqBy(this.cells, (c) => c.node);
    }
}
