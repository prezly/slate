import type { SlateEditor, TElement, TText } from '@udecode/plate-common';
import type { Location, Node } from 'slate';

import * as TableCommands from './commands';
import { TableCellNode, TableRowNode, TableNode } from './nodes';
import * as TableQueries from './queries';

export interface TablesSchema {
    createContentNode: () => TElement | TText;
    createTableNode: (props: Partial<TableNode>) => TableNode;
    createTableRowNode: (props: Partial<TableRowNode>) => TableRowNode;
    createTableCellNode: (props: Partial<TableCellNode>) => TableCellNode;
    isTableNode: (node: Node) => node is TableNode;
    isTableRowNode: (node: Node) => node is TableRowNode;
    isTableCellNode: (node: Node) => node is TableCellNode;
}

export interface TablesEditor extends TablesSchema, SlateEditor {}

export namespace TablesEditor {
    export const insertTable = TableCommands.insertTable;
    export const removeColumn = TableCommands.removeColumn;
    export const removeRow = TableCommands.removeRow;
    export const removeTable = TableCommands.removeTable;

    export const findParentCell = TableQueries.findParentCell;
    export const findParentTable = TableQueries.findParentTable;
    export const isHeaderCell = TableQueries.isHeaderCell;
    export const isInTable = TableQueries.isInTable;

    export const createTable = TableNode.createTable;
    export const updateTable = TableNode.update;
    export const toggleTableHeader = TableNode.toggleTableHeader;
    export const createTableCell = TableCellNode.createTableCell;
    export const createTableRow = TableRowNode.createTableRow;

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

    export function isTablesEditor(editor: SlateEditor): editor is TablesEditor {
        return typeof editor === 'object' && editor !== null && 'isTableCellNode' in editor;
    }
}
