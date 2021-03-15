import { DIVIDER_TYPE } from '../constants';
import { DividerElementType } from '../types';

const createDivider = (): DividerElementType => ({
    children: [{ text: '' }],
    type: DIVIDER_TYPE,
});

export default createDivider;
