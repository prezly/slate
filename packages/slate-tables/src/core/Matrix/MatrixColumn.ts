import type { Matrix } from './Matrix';
import type { MatrixCell } from './MatrixCell';

export class MatrixColumn {
    public readonly cells: MatrixCell[] = [];

    private readonly x: number;
    private readonly matrix: Matrix;

    constructor(x: number, matrix: Matrix, cells: MatrixCell[]) {
        this.x = x;
        this.cells = cells;
        this.matrix = matrix;
    }

    get columnLeft(): MatrixColumn | undefined {
        return this.matrix.columns[this.x - 1];
    }

    get columnRight(): MatrixColumn | undefined {
        return this.matrix.columns[this.x + 1];
    }
}
