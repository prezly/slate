import type { NewsroomRef } from '@prezly/sdk';

export interface ImageExtensionConfiguration {
    mediaGalleryTab?: {
        newsroom: NewsroomRef;
    };
    withAlignmentOptions?: boolean;
    withCaptions?: boolean;
    withSizeOptions?: boolean;
    withLayoutOptions?: boolean;
    withNewTabOption?: boolean;
    withMediaGalleryTab?: false | { enabled: true; newsroom: NewsroomRef };
}
