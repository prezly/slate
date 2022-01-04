import type { DividerNode } from '@prezly/slate-types';
import { DIVIDER_NODE_TYPE } from '@prezly/slate-types';

export function createDivider(): DividerNode {
    return {
        children: [{ text: '' }],
        type: DIVIDER_NODE_TYPE,
    };
}
