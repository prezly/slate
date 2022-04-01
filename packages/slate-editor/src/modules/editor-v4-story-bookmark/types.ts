import type { StoryBookmarkNode } from '@prezly/slate-types';
import type { ReactNode } from 'react';

export interface StoryBookmarkExtensionParameters {
    renderInput: ({
        onCreate,
        onRemove,
    }: {
        onCreate: (props: Pick<StoryBookmarkNode, 'story'> & Partial<StoryBookmarkNode>) => void;
        onRemove: () => void;
    }) => ReactNode;
}
