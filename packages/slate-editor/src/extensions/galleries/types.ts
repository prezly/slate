import type { NewsroomRef } from '@prezly/sdk';

export interface GalleriesExtensionConfiguration {
    withMediaGalleryTab?: false | { enabled: true; newsroom: NewsroomRef };
    withWidthOption?: boolean;
}
