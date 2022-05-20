import type { ContactNode } from '@prezly/slate-types';
import { isContactNode } from '@prezly/slate-types';

import { createPressContact } from './createPressContact';

export function parseSerializedElement(serialized: string): ContactNode | undefined {
    const parsed = JSON.parse(serialized);

    if (isContactNode(parsed)) {
        return createPressContact(parsed.contact);
    }

    return undefined;
}
