import type { NewsroomRef } from '@prezly/sdk';

import type { MediaGalleryOptions } from '#modules/uploadcare';

export function withGalleryTabMaybe(
    withMediaGalleryTab: false | { enabled: boolean; newsroom: NewsroomRef },
): MediaGalleryOptions<true> | MediaGalleryOptions<false> {
    if (withMediaGalleryTab && withMediaGalleryTab.enabled) {
        return { mediaGalleryTab: true, newsroom: withMediaGalleryTab.newsroom };
    }
    return { mediaGalleryTab: false };
}
