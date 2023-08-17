import { VideoNode } from '@prezly/slate-types';

import { createVideoBookmark } from './createVideoBookmark';

export function parseSerializedElement(serialized: string): VideoNode | undefined {
    const parsed = JSON.parse(serialized);

    if (VideoNode.validateVideoNode(parsed)) {
        return createVideoBookmark(parsed);
    }

    return undefined;
}
