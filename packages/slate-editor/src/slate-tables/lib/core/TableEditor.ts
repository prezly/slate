import type { BaseEditor, Editor, Element, Location } from 'slate';

import * as TableCommands from '../commands';
import * as TableQueries from '../queries';

export interface TableNodeType {
    table: string;
    row: string;
    cell: string;
}

export interface TableSchema {
    tableNodeTypes: TableNodeType;
    createContentNode: () => Element | { text: '' };
    focusEditor: (editor: Editor) => void;
}

export interface TableEditor extends TableSchema, BaseEditor {}

export namespace TableEditor {
    export const insertColumn = TableCommands.insertColumn;
    export const insertRow = TableCommands.insertRow;
    export const insertTable = TableCommands.insertTable;
    export const mergeCell = TableCommands.mergeCell;
    export const removeColumn = TableCommands.removeColumn;
    export const removeRow = TableCommands.removeRow;
    export const removeTable = TableCommands.removeTable;
    export const splitCell = TableCommands.splitCell;

    export const isInTable = TableQueries.isInTable;

    export function insertColumnLeft(editor: Editor, location?: Location) {
        return TableCommands.insertColumn(editor, location, 'left');
    }

    export function insertColumnRight(editor: Editor, location?: Location) {
        return TableCommands.insertColumn(editor, location, 'right');
    }

    export function insertRowAbove(editor: Editor, location?: Location) {
        return TableCommands.insertRow(editor, location, 'above');
    }

    export function insertRowBelow(editor: Editor, location?: Location) {
        return TableCommands.insertRow(editor, location, 'bellow');
    }

    export function mergeCellAbove(editor: Editor, location?: Location) {
        return TableCommands.mergeCell(editor, location, 'above');
    }

    export function mergeCellBelow(editor: Editor, location?: Location) {
        return TableCommands.mergeCell(editor, location, 'bellow');
    }

    export function mergeCellLeft(editor: Editor, location?: Location) {
        return TableCommands.mergeCell(editor, location, 'left');
    }

    export function mergeCellRight(editor: Editor, location?: Location) {
        return TableCommands.mergeCell(editor, location, 'right');
    }

    export function splitCellAbove(editor: Editor, location?: Location) {
        return TableCommands.splitCell(editor, location, 'above');
    }

    export function splitCellBelow(editor: Editor, location?: Location) {
        return TableCommands.splitCell(editor, location, 'bellow');
    }

    export function splitCellLeft(editor: Editor, location?: Location) {
        return TableCommands.splitCell(editor, location, 'left');
    }

    export function splitCellRight(editor: Editor, location?: Location) {
        return TableCommands.splitCell(editor, location, 'right');
    }
}
