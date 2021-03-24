import { isEqual, shuffle } from 'lodash';

import { GalleryElementType } from '../types';

const shuffleImages = (images: GalleryElementType['images']): GalleryElementType['images'] => {
    if (images.length <= 1) {
        return images;
    }

    let shuffledImages = shuffle(images);

    while (isEqual(images, shuffledImages)) {
        shuffledImages = shuffle(shuffledImages);
    }

    return shuffledImages;
};

export default shuffleImages;
