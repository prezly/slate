import type { ContactNode } from '@prezly/slate-types';
import { isContactNode, isPressContact } from '@prezly/slate-types';

import { createPressContact } from './createPressContact';

export function parseSerializedElement(serialized: string): ContactNode | undefined {
    const parsed = JSON.parse(serialized);

    if (isContactNode(parsed) && isPressContact(parsed.contact)) {
        return createPressContact({ contact: parsed.contact });
    }

    return undefined;
}
