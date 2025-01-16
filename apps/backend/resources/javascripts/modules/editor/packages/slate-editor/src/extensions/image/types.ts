import type { NewsroomRef } from '@prezly/sdk';

export interface ImageExtensionConfiguration {
    withAlignmentOptions?: boolean;
    withCaptions?: boolean;
    withSizeOptions?: boolean;
    withLayoutOptions?: boolean;
    withNewTabOption?: boolean;
    withMediaGalleryTab?: false | { enabled: boolean; newsroom: NewsroomRef };
}
