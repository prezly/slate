import { Editor, Location } from 'slate';

import { Traverse } from '../core';
import type { TableCellNode, TableNode } from '../nodes';
import type { TablesEditor } from '../TablesEditor';

export function isHeaderCell(editor: TablesEditor, location?: Location | null): boolean;
export function isHeaderCell(table: TableNode, cell: TableCellNode): boolean;
export function isHeaderCell(
    editorOrTable: TablesEditor | TableNode,
    locationOrCell?: (Location | null) | TableCellNode,
) {
    let table: TableNode | undefined;
    let cell: TableCellNode | undefined;

    const isEditor = Editor.isEditor(editorOrTable);
    const isLocation = Location.isLocation(locationOrCell);

    if (isEditor || isLocation || locationOrCell === null) {
        if (isEditor) {
            const location = locationOrCell ?? editorOrTable.selection;

            if (Location.isLocation(location)) {
                const traverse = Traverse.create(editorOrTable, location);
                table = traverse?.matrix.node;
                cell = traverse?.activeCell.node;
            }
        }
    } else {
        table = editorOrTable;
        cell = locationOrCell;
    }

    if (table && cell) {
        return (
            (table.header?.includes('first_row') && isFirstRow(table, cell)) ||
            (table.header?.includes('first_column') && isFirstColumn(table, cell))
        );
    }

    return false;
}

function isFirstRow(table: TableNode, cell: TableCellNode): boolean {
    return table.children[0]?.children.includes(cell);
}

function isFirstColumn(table: TableNode, cell: TableCellNode): boolean {
    return table.children.some((row) => row.children[0] === cell);
}
