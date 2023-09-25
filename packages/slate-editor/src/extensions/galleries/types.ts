import type { NewsroomRef } from '@prezly/sdk';

export interface GalleriesExtensionConfiguration {
    withLayoutOptions?: boolean;
    withMediaGalleryTab?: false | { enabled: boolean; newsroom: NewsroomRef };
}
