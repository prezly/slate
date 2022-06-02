import type { Editor, NodeEntry } from 'slate';

import type { TableNode } from '../../nodes';

import { createGridWithSpans } from './createGridWithSpans';
import { MatrixColumn } from './MatrixColumn';
import { MatrixRow } from './MatrixRow';

export class Matrix {
    public node: NodeEntry<TableNode>[0];
    public path: NodeEntry<TableNode>[1];
    public rows: MatrixRow[];
    public columns: MatrixColumn[];

    constructor(editor: Editor, [node, path]: NodeEntry<TableNode>) {
        this.node = node;
        this.path = path;
        const grid = createGridWithSpans(editor, [node, path]);

        this.rows = grid.map((gridRow, index) => new MatrixRow(editor, gridRow, index, this));

        this.columns = Array.from(new Array(this.rows[0]?.cells.length)).map(
            (_, columnIndex) => new MatrixColumn(editor, columnIndex, this),
        );
    }

    get width() {
        return this.columns.length;
    }

    get height() {
        return this.rows.length;
    }
}
