import { uniqBy } from '#lodash';

import type { TableEditor } from '../../core';

import type { Matrix } from './Matrix';
import type { MatrixCell } from './MatrixCell';

export class MatrixColumn {
    public readonly cells: MatrixCell[] = [];

    private readonly index: number;
    private readonly matrix: Matrix;

    constructor(_editor: TableEditor, index: number, matrix: Matrix) {
        this.index = index;
        this.matrix = matrix;

        matrix.rows.forEach((r) => {
            const columnCell = r.cells.at(index);

            if (columnCell) {
                this.cells.push(columnCell);
            }
        });
    }

    get columnLeft() {
        return this.matrix.columns.at(this.index - 1);
    }

    get columnRight() {
        return this.matrix.columns.at(this.index + 1);
    }

    get firstCell() {
        return this.cells.at(0);
    }

    get isFirst() {
        return this.index === 0;
    }

    get isLast() {
        return this.index === this.matrix.width - 1;
    }

    get uniqCells() {
        return uniqBy(this.cells, (c) => c.node);
    }
}
