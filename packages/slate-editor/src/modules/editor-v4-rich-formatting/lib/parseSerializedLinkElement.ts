import type { LinkNode } from '@prezly/slate-types';
import { isLinkNode } from '@prezly/slate-types';

import createLink from './createLink';

const parseSerializedLinkElement = (serialized: string): LinkNode | undefined => {
    const parsed = JSON.parse(serialized);

    if (isLinkNode(parsed)) {
        return createLink(parsed.href);
    }

    return undefined;
};

export default parseSerializedLinkElement;
