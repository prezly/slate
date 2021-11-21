import type { DividerNode } from '@prezly/slate-types';
import { DIVIDER_NODE_TYPE } from '@prezly/slate-types';

const createDivider = (): DividerNode => ({
    children: [{ text: '' }],
    type: DIVIDER_NODE_TYPE,
});

export default createDivider;
