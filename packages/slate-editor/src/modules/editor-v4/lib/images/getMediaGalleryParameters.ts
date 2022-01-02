import type { ImageExtensionParameters } from '../../../../modules/editor-v4-image';
import type { MediaGalleryOptions } from '../../../../modules/editor-v4-uploadcare';

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

