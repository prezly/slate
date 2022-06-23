import {
    type TableNode,
    type TableRowNode,
    type TableCellNode,
    TABLE_NODE_TYPE,
    TABLE_ROW_NODE_TYPE,
    TABLE_CELL_NODE_TYPE,
} from '@prezly/slate-types';

export function createTableNode(props: Partial<Omit<TableNode, 'type'>>): TableNode {
    return {
        children: [],
        ...props,
        type: TABLE_NODE_TYPE,
    };
}

export function createTableRowNode(props: Partial<Omit<TableRowNode, 'type'>>): TableRowNode {
    return {
        children: [],
        ...props,
        type: TABLE_ROW_NODE_TYPE,
    };
}

export function createTableCellNode(props: Partial<Omit<TableCellNode, 'type'>>): TableCellNode {
    return {
        children: [],
        ...props,
        type: TABLE_CELL_NODE_TYPE,
    };
}
