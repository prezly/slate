import type { VideoNode } from '@prezly/slate-types';
import { validateVideoNode } from '@prezly/slate-types';

import { createVideoBookmark } from './createVideoBookmark';

export function parseSerializedElement(serialized: string): VideoNode | undefined {
    const parsed = JSON.parse(serialized);

    if (validateVideoNode(parsed)) {
        return createVideoBookmark(parsed);
    }

    return undefined;
}
