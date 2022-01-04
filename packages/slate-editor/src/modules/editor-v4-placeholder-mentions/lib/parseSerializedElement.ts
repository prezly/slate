import type { PlaceholderKey, PlaceholderNode } from '@prezly/slate-types';
import { isPlaceholderNode } from '@prezly/slate-types';

import { createPlaceholderMention } from './createPlaceholderMention';

export function parseSerializedElement(serialized: string): PlaceholderNode | undefined {
    const parsed = JSON.parse(serialized);

    if (isPlaceholderNode(parsed)) {
        return createPlaceholderMention(parsed.key as PlaceholderKey);
    }

    return undefined;
}
