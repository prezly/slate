import type { LinkNode } from '@prezly/slate-types';
import { isLinkNode } from '@prezly/slate-types';

import { createLink } from './createLink';

export function parseSerializedLinkElement(serialized: string): LinkNode | undefined {
    const parsed = JSON.parse(serialized);

    if (isLinkNode(parsed)) {
        return createLink(parsed);
    }

    return undefined;
}
