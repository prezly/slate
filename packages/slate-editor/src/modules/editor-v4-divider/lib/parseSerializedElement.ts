import { DividerElementType } from '../types';

import createDivider from './createDivider';
import isDividerElement from './isDividerElement';

const parseSerializedElement = (serialized: string): DividerElementType | undefined => {
    const parsed = JSON.parse(serialized);

    if (isDividerElement(parsed)) {
        return createDivider();
    }

    return undefined;
};

export default parseSerializedElement;
