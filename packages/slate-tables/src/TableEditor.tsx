import type { BaseEditor, Element, Location } from 'slate';

import * as TableCommands from './commands';
import { TableNode } from './nodes';
import * as TableQueries from './queries';

export interface TableNodeType {
    table: string;
    row: string;
    cell: string;
}

export interface TableSchema {
    tableNodeTypes: TableNodeType;
    createContentNode: () => Element | { text: '' };
    focusEditor: () => void;
}

export interface TableEditor extends TableSchema, BaseEditor {}

export namespace TableEditor {
    export const insertTable = TableCommands.insertTable;
    export const removeColumn = TableCommands.removeColumn;
    export const removeRow = TableCommands.removeRow;
    export const removeTable = TableCommands.removeTable;

    export const isInTable = TableQueries.isInTable;

    export const createTableNode = TableNode.createTableNode;
    export const updateTable = TableNode.update;
    export const toggleTableHeader = TableNode.toggleTableHeader;

    export function insertColumnLeft(editor: TableEditor, location?: Location) {
        return TableCommands.insertColumn(editor, location, 'left');
    }

    export function insertColumnRight(editor: TableEditor, location?: Location) {
        return TableCommands.insertColumn(editor, location, 'right');
    }

    export function insertRowAbove(editor: TableEditor, location?: Location) {
        return TableCommands.insertRow(editor, location, 'above');
    }

    export function insertRowBelow(editor: TableEditor, location?: Location) {
        return TableCommands.insertRow(editor, location, 'bellow');
    }
}
