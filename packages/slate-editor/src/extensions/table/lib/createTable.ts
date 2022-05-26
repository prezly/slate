import type { TableNode } from '@prezly/slate-types';
import { TABLE_NODE_TYPE, TABLE_ROW_NODE_TYPE, TABLE_CELL_NODE_TYPE } from '@prezly/slate-types';

export function createTable(): TableNode {
    return {
        children: [
            {
                type: TABLE_ROW_NODE_TYPE,
                children: [{ type: TABLE_CELL_NODE_TYPE, children: [{ text: '' }] }],
            },
        ],
        type: TABLE_NODE_TYPE,
    };
}
