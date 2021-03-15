import { ImageExtensionParameters } from 'modules/editor-v4-image';
import { MediaGalleryOptions } from 'modules/editor-v4-uploadcare';

const getMediaGalleryParameters = (
    withImages: ImageExtensionParameters,
): MediaGalleryOptions<true> | MediaGalleryOptions<false> => {
    if (withImages.mediaGalleryTab) {
        return {
            mediaGalleryTab: true,
            newsroom: withImages.mediaGalleryTab.newsroom,
        };
    }

    return { mediaGalleryTab: false };
};

export default getMediaGalleryParameters;
