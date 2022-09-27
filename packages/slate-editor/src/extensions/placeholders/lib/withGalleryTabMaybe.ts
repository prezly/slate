import type { NewsroomRef } from '@prezly/sdk';

import type { MediaGalleryOptions } from '#modules/uploadcare';

export function withGalleryTabMaybe(
    newsroom: NewsroomRef | undefined,
): MediaGalleryOptions<true> | MediaGalleryOptions<false> {
    if (newsroom) {
        return { mediaGalleryTab: true, newsroom };
    }
    return { mediaGalleryTab: false };
}
