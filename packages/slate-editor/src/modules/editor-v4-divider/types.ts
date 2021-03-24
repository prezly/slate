import { Element } from 'slate';

import { DIVIDER_TYPE } from './constants';

export type DividerType = typeof DIVIDER_TYPE;

export interface DividerElementType extends Element {
    type: DividerType;
}
