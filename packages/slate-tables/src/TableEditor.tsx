import type { BaseEditor, Element } from 'slate';

import * as TableCommands from './commands';

export interface TableNodeType {
    table: string;
    row: string;
    cell: string;
}

export interface TableSchema {
    tableNodeTypes: TableNodeType;
    createContentNode: () => Element | { text: '' };
    focusEditor: (editor: BaseEditor) => void;
}

export interface TableEditor extends TableSchema, BaseEditor {}

export interface TableEditor extends TableSchema, BaseEditor {}

export namespace TableEditor {
    export const insertTable = TableCommands.insertTable;
}
