import type { Story } from '@prezly/sdk';
import type { StoryBookmarkNode } from '@prezly/slate-types';
import type { ReactNode } from 'react';

export interface StoryBookmarkExtensionParameters {
    renderInput: (args: {
        onCreate: (props: Pick<StoryBookmarkNode, 'story'> & Partial<StoryBookmarkNode>) => void;
        onRemove: () => void;
    }) => ReactNode;

    loadStory: (uuid: string) => Promise<Story>;
}
