import { GalleryElementType } from '../types';

import createGallery from './createGallery';
import isGalleryElement from './isGalleryElement';

const parseSerializedElement = (serialized: string): GalleryElementType | undefined => {
    const parsed = JSON.parse(serialized);

    if (isGalleryElement(parsed)) {
        return createGallery(parsed.images, {
            layout: parsed.layout,
            padding: parsed.padding,
            thumbnail_size: parsed.thumbnail_size,
        });
    }

    return undefined;
};

export default parseSerializedElement;
