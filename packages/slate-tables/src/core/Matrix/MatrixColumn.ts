import { uniqBy } from 'lodash-es';

import type { TableEditor } from '../../TableEditor';

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
            const columnCell = r.cells[index];

            if (columnCell) {
                this.cells.push(columnCell);
            }
        });
    }

    get columnLeft(): MatrixColumn | undefined {
        return this.matrix.columns[this.index - 1];
    }

    get columnRight(): MatrixColumn | undefined {
        return this.matrix.columns[this.index + 1];
    }

    get firstCell(): MatrixCell | undefined {
        return this.cells[0];
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
