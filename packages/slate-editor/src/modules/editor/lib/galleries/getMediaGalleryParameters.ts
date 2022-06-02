import type { GalleriesExtensionConfiguration } from '#extensions/galleries';
import type { MediaGalleryOptions } from '#modules/uploadcare';

export function getMediaGalleryParameters(
    config: GalleriesExtensionConfiguration,
): MediaGalleryOptions<true> | MediaGalleryOptions<false> {
    if (config.mediaGalleryTab) {
        return {
            mediaGalleryTab: true,
            newsroom: config.mediaGalleryTab.newsroom,
        };
    }

    return { mediaGalleryTab: false };
}
