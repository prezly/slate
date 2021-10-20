import { DividerNode } from '@prezly/slate-types';

import { DIVIDER_TYPE } from '../constants';

const createDivider = (): DividerNode => ({
    children: [{ text: '' }],
    type: DIVIDER_TYPE,
});

export default createDivider;
