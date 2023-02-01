import type { Story } from '@prezly/sdk';
import type { StoryBookmarkNode } from '@prezly/slate-types';
import type { ReactNode } from 'react';

export interface StoryBookmarkExtensionParameters {
    withNewTabOption?: boolean;
    renderInput: (args: {
        onCreate: (props: Pick<StoryBookmarkNode, 'story'> & Partial<StoryBookmarkNode>) => void;
        onRemove: () => void;
    }) => ReactNode;

    loadStory: (uuid: string) => Promise<Story>;

    generateEditUrl: (story: Story) => string | undefined;

    generatePreviewUrl: (story: Story) => string | undefined;
}
