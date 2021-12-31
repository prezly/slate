import type { DividerNode } from '@prezly/slate-types';
import { DIVIDER_NODE_TYPE } from '@prezly/slate-types';

function createDivider(): DividerNode {
    return {
        children: [{ text: '' }],
        type: DIVIDER_NODE_TYPE,
    };
}

export default createDivider;
