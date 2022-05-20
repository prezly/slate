import type { ImageExtensionParameters } from '#extensions/image';
import type { MediaGalleryOptions } from '#modules/uploadcare';

export function getMediaGalleryParameters(
    withImages: ImageExtensionParameters,
): MediaGalleryOptions<true> | MediaGalleryOptions<false> {
    if (withImages.mediaGalleryTab) {
        return {
            mediaGalleryTab: true,
            newsroom: withImages.mediaGalleryTab.newsroom,
        };
    }

    return { mediaGalleryTab: false };
}
