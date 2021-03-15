import { GalleriesExtensionParameters } from 'modules/editor-v4-galleries';
import { MediaGalleryOptions } from 'modules/editor-v4-uploadcare';

const getMediaGalleryParameters = (
    withGalleries: GalleriesExtensionParameters,
): MediaGalleryOptions<true> | MediaGalleryOptions<false> => {
    if (withGalleries.mediaGalleryTab) {
        return {
            mediaGalleryTab: true,
            newsroom: withGalleries.mediaGalleryTab.newsroom,
        };
    }

    return { mediaGalleryTab: false };
};

export default getMediaGalleryParameters;
