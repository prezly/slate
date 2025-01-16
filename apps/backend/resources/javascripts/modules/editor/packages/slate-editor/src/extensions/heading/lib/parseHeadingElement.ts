import type { HeadingNode } from '@prezly/slate-types';
import { isHeadingNode } from '@prezly/slate-types';

import { createHeading } from './createHeading';

export function parseHeadingElement(serialized: string): HeadingNode | undefined {
    const parsed = JSON.parse(serialized);

    if (isHeadingNode(parsed)) {
        return createHeading(parsed);
    }

    return undefined;
}
