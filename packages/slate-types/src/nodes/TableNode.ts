import { isElementNode } from './ElementNode';
import type { ElementNode } from './ElementNode';

export const TABLE_CELL_NODE_TYPE = 'table-cell';
export const TABLE_ROW_NODE_TYPE = 'table-row';
export const TABLE_NODE_TYPE = 'table';

export interface TableRowNode extends ElementNode {
    type: typeof TABLE_ROW_NODE_TYPE;
    children: TableCellNode[];
}

export interface TableCellNode extends ElementNode {
    type: typeof TABLE_CELL_NODE_TYPE;
    rowspan?: number;
    colspan?: number;
}

export type TableHeader = 'first_row';

export interface TableNode extends ElementNode {
    type: typeof TABLE_NODE_TYPE;
    children: TableRowNode[];
    border?: boolean;
    header?: TableHeader[];
}

export function isTableCellNode(value: unknown): value is TableCellNode {
    return isElementNode<TableCellNode>(value, TABLE_CELL_NODE_TYPE);
}

export function isTableRowNode(value: unknown): value is TableRowNode {
    return isElementNode<TableRowNode>(value, TABLE_ROW_NODE_TYPE);
}

export function isTableNode(value: unknown): value is TableNode {
    return isElementNode<TableNode>(value, TABLE_NODE_TYPE);
}
