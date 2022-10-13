import type { NewsroomRef } from '@prezly/sdk';

export interface GalleriesExtensionConfiguration {
    mediaGalleryTab?: {
        newsroom: NewsroomRef;
    };
    withWidthOption?: boolean;
}
