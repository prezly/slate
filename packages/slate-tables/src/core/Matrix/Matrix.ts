import type { NodeEntry } from 'slate';

import type { TableNode } from '../../nodes';
import type { TablesEditor } from '../../TablesEditor';

import { createGridWithSpans } from './createGridWithSpans';
import { MatrixColumn } from './MatrixColumn';
import { MatrixRow } from './MatrixRow';

export class Matrix {
    public node: NodeEntry<TableNode>[0];
    public path: NodeEntry<TableNode>[1];
    public rows: MatrixRow[];
    public columns: MatrixColumn[];

    constructor(editor: TablesEditor, [node, path]: NodeEntry<TableNode>) {
        this.node = node;
        this.path = path;
        const grid = createGridWithSpans(editor, [node, path]);

        this.rows = grid.map((gridRow, index) => new MatrixRow(gridRow, index, this));

        this.columns = Array.from(new Array(this.rows[0]?.cells.length)).map(
            (_, columnIndex) => new MatrixColumn(columnIndex, this),
        );
    }

    get width() {
        return this.columns.length;
    }

    get height() {
        return this.rows.length;
    }
}
