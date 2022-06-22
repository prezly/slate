import type { Element, Location, Node } from 'slate';
import type { ReactEditor } from 'slate-react';

import * as TableCommands from './commands';
import { type TableCellNode, type TableRowNode, TableNode } from './nodes';
import * as TableQueries from './queries';

export interface TablesSchema {
    createTableNode: <T extends TableNode>(props: Partial<T>) => T;
    createTableRowNode: <T extends TableRowNode>(props: Partial<T>) => T;
    createTableCellNode: <T extends TableCellNode>(props: Partial<T>) => T;
    isTableNode: <T extends TableNode>(node: Node) => node is T;
    isTableRowNode: <T extends TableRowNode>(node: Node) => node is T;
    isTableCellNode: <T extends TableCellNode>(node: Node) => node is T;
    createContentNode: () => Element | { text: '' };
}

export interface TablesEditor extends TablesSchema, ReactEditor {}

export namespace TablesEditor {
    export const insertTable = TableCommands.insertTable;
    export const removeColumn = TableCommands.removeColumn;
    export const removeRow = TableCommands.removeRow;
    export const removeTable = TableCommands.removeTable;

    export const isInTable = TableQueries.isInTable;

    export const createTable = TableNode.createTable;
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
