import type { StoryBookmarkNode } from '@prezly/slate-types';
import type { ReactNode } from 'react';

interface NewsroomRef {
    display_name: string;
    thumbnail_url: string;
    url: string;
}
export interface Story {
    uuid: string;
    title: string;
    newsroom: NewsroomRef;
    thumbnail_url: string;
    links: {
        newsroom_preview: string;
    };
}

export interface StoryBookmarkExtensionParameters {
    renderInput: (args: {
        onCreate: (props: Pick<StoryBookmarkNode, 'story'> & Partial<StoryBookmarkNode>) => void;
        onRemove: () => void;
    }) => ReactNode;

    loadStory: (uuid: string) => Promise<Story>;
}
