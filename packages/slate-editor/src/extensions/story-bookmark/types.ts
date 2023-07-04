import type { Story } from '@prezly/sdk';

export interface StoryBookmarkExtensionParameters {
    withNewTabOption?: boolean;

    loadStory: (uuid: string) => Promise<Story>;

    generateEditUrl: (story: Story) => string | undefined;

    generatePreviewUrl: (story: Story) => string | undefined;
}
