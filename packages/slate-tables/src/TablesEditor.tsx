import type { Element, Location } from 'slate';
import type { ReactEditor } from 'slate-react';

import * as TableCommands from './commands';
import { TableNode } from './nodes';
import * as TableQueries from './queries';

export interface TableNodeType {
    table: string;
    row: string;
    cell: string;
}

export interface TablesSchema {
    tableNodeTypes: TableNodeType;
    createContentNode: () => Element | { text: '' };
}

export interface TablesEditor extends TablesSchema, ReactEditor {}

export namespace TablesEditor {
    export const insertTable = TableCommands.insertTable;
    export const removeColumn = TableCommands.removeColumn;
    export const removeRow = TableCommands.removeRow;
    export const removeTable = TableCommands.removeTable;

    export const isInTable = TableQueries.isInTable;

    export const createTableNode = TableNode.createTableNode;
    export const updateTable = TableNode.update;
    export const toggleTableHeader = TableNode.toggleTableHeader;

    export function insertColumnLeft(editor: TablesEditor, location?: Location) {
        return TableCommands.insertColumn(editor, location, 'left');
    }

    export function insertColumnRight(editor: TablesEditor, location?: Location) {
        return TableCommands.insertColumn(editor, location, 'right');
    }

    export function insertRowAbove(editor: TablesEditor, location?: Location) {
        return TableCommands.insertRow(editor, location, 'above');
    }

    export function insertRowBelow(editor: TablesEditor, location?: Location) {
        return TableCommands.insertRow(editor, location, 'bellow');
    }
}
