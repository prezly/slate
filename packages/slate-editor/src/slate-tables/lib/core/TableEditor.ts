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
    export const addCell = TableCommands.addCell;
    export const divideCell = TableCommands.divideCell;
    export const insertColumn = TableCommands.insertColumn;
    export const insertRow = TableCommands.insertRow;
    export const insertTable = TableCommands.insertTable;
    export const mergeCell = TableCommands.mergeCell;
    export const removeColumn = TableCommands.removeColumn;
    export const removeRow = TableCommands.removeRow;
    export const removeTable = TableCommands.removeTable;

    export const isInTable = TableQueries.isInTable;

    export function addCellAbove(editor: Editor, location?: Location) {
        return TableCommands.addCell(editor, location, 'above');
    }

    export function addCellBelow(editor: Editor, location?: Location) {
        return TableCommands.addCell(editor, location, 'bellow');
    }

    export function addCellLeft(editor: Editor, location?: Location) {
        return TableCommands.addCell(editor, location, 'left');
    }

    export function addCellRight(editor: Editor, location?: Location) {
        return TableCommands.addCell(editor, location, 'right');
    }

    export function divideCellAbove(editor: Editor, location?: Location) {
        return TableCommands.divideCell(editor, location, 'above');
    }

    export function divideCellBelow(editor: Editor, location?: Location) {
        return TableCommands.divideCell(editor, location, 'bellow');
    }

    export function divideCellLeft(editor: Editor, location?: Location) {
        return TableCommands.divideCell(editor, location, 'left');
    }

    export function divideCellRight(editor: Editor, location?: Location) {
        return TableCommands.divideCell(editor, location, 'right');
    }

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
}
