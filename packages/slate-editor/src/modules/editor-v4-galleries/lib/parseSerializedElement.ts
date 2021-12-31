import type { GalleryNode } from '@prezly/slate-types';
import { isGalleryNode } from '@prezly/slate-types';

import createGallery from './createGallery';

const parseSerializedElement = (serialized: string): GalleryNode | undefined => {
    const parsed = JSON.parse(serialized);

    if (isGalleryNode(parsed)) {
        return createGallery(parsed.images, {
            layout: parsed.layout,
            padding: parsed.padding,
            thumbnail_size: parsed.thumbnail_size,
        });
    }

    return undefined;
};

export default parseSerializedElement;
