import type { TNode } from '@udecode/plate-common';
import type { Node } from 'slate';

import { type ElementNode, isElementNode } from './ElementNode';

export const TABLE_NODE_TYPE = 'table';
export const TABLE_ROW_NODE_TYPE = 'table-row';
export const TABLE_CELL_NODE_TYPE = 'table-cell';

export type TableHeader = 'first_row' | 'first_column';

export interface TableNode extends ElementNode {
    type: typeof TABLE_NODE_TYPE;
    children: TableRowNode[];
    border?: boolean;
    header?: TableHeader[];
}

export interface TableRowNode extends ElementNode {
    type: typeof TABLE_ROW_NODE_TYPE;
    children: TableCellNode[];
}

export interface TableCellNode extends ElementNode {
    type: typeof TABLE_CELL_NODE_TYPE;
    rowspan?: number;
    colspan?: number;
}

export function isTableNode(value: Node | TNode): value is TableNode {
    return isElementNode<TableNode>(value, TABLE_NODE_TYPE);
}

export function isTableCellNode(value: Node | TNode): value is TableCellNode {
    return isElementNode<TableCellNode>(value, TABLE_CELL_NODE_TYPE);
}

export function isTableRowNode(value: Node | TNode): value is TableRowNode {
    return isElementNode<TableRowNode>(value, TABLE_ROW_NODE_TYPE);
}
