import type { Editor, Element, Location, Node, Text } from 'slate';
import type { ReactEditor } from 'slate-react';

import * as TableCommands from './commands';
import { type TableCellNode, type TableRowNode, TableNode } from './nodes';
import * as TableQueries from './queries';

export interface TablesSchema {
    createContentNode: () => Element | Text;
    createTableNode: (props: Partial<TableNode>) => TableNode;
    createTableRowNode: (props: Partial<TableRowNode>) => TableRowNode;
    createTableCellNode: (props: Partial<TableCellNode>) => TableCellNode;
    isTableNode: (node: Node) => node is TableNode;
    isTableRowNode: (node: Node) => node is TableRowNode;
    isTableCellNode: (node: Node) => node is TableCellNode;
}

export interface TablesEditor extends TablesSchema, ReactEditor {}

export namespace TablesEditor {
    export const insertTable = TableCommands.insertTable;
    export const removeColumn = TableCommands.removeColumn;
    export const removeRow = TableCommands.removeRow;
    export const removeTable = TableCommands.removeTable;

    export const findParentTable = TableQueries.findParentTable;
    export const isHeaderCell = TableQueries.isHeaderCell;
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

    export function isTablesEditor(editor: Editor): editor is TablesEditor {
        return 'isTableCellNode' in editor;
    }
}
