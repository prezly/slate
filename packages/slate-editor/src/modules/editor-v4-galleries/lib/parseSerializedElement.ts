import type { GalleryNode } from '@prezly/slate-types';
import { isGalleryNode } from '@prezly/slate-types';

import { createGallery } from './createGallery';

export function parseSerializedElement(serialized: string): GalleryNode | undefined {
    const parsed = JSON.parse(serialized);

    if (isGalleryNode(parsed)) {
        return createGallery(parsed);
    }

    return undefined;
}
