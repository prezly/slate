import type { ContactNode } from '@prezly/slate-types';
import { isContactNode } from '@prezly/slate-types';

import { createContactNode } from './createContactNode';

export function parseSerializedElement(serialized: string): ContactNode | undefined {
    const parsed = JSON.parse(serialized);

    if (isContactNode(parsed)) {
        return createContactNode(parsed);
    }

    return undefined;
}
