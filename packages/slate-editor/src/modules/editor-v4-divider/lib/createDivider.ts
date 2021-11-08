import { DIVIDER_NODE_TYPE, DividerNode } from '@prezly/slate-types';

const createDivider = (): DividerNode => ({
    children: [{ text: '' }],
    type: DIVIDER_NODE_TYPE,
});

export default createDivider;
