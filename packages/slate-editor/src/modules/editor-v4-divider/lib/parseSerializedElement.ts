import type { DividerNode } from '@prezly/slate-types';
import { isDividerNode } from '@prezly/slate-types';

import createDivider from './createDivider';

function parseSerializedElement(serialized: string): DividerNode | undefined {
    const parsed = JSON.parse(serialized);

    if (isDividerNode(parsed)) {
        return createDivider();
    }

    return undefined;
}

export default parseSerializedElement;
