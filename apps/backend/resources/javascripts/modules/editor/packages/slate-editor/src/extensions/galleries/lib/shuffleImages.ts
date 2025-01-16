import type { GalleryNode } from '@prezly/slate-types';
import { isEqual, shuffle } from '@technically/lodash';

export function shuffleImages(images: GalleryNode['images']): GalleryNode['images'] {
    if (images.length <= 1) {
        return images;
    }

    let shuffledImages = shuffle(images);

    while (isEqual(images, shuffledImages)) {
        shuffledImages = shuffle(shuffledImages);
    }

    return shuffledImages;
}
