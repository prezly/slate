import type { ImageNode } from '@prezly/slate-types';
import { isImageNode } from '@prezly/slate-types';

import { createImage } from './createImage';

export function parseSerializedElement(serialized: string): ImageNode | undefined {
    const parsed = JSON.parse(serialized);

    if (isImageNode(parsed)) {
        return createImage(parsed);
    }

    return undefined;
}
