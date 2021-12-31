import type { GalleriesExtensionParameters } from '#modules/editor-v4-galleries';
import type { MediaGalleryOptions } from '#modules/editor-v4-uploadcare';

function getMediaGalleryParameters(
    withGalleries: GalleriesExtensionParameters,
): MediaGalleryOptions<true> | MediaGalleryOptions<false> {
    if (withGalleries.mediaGalleryTab) {
        return {
            mediaGalleryTab: true,
            newsroom: withGalleries.mediaGalleryTab.newsroom,
        };
    }

    return { mediaGalleryTab: false };
}

export default getMediaGalleryParameters;
