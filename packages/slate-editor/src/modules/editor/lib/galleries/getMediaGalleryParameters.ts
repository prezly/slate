import type { GalleriesExtensionParameters } from '#extensions/galleries';
import type { MediaGalleryOptions } from '#modules/uploadcare';

export function getMediaGalleryParameters(
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
