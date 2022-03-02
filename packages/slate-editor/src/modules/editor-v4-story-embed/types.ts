import type { StoryRef } from '@prezly/sdk';
import type { StoryEmbedNode } from '@prezly/slate-types';
import type { ReactNode } from 'react';

export interface StoryEmbedExtensionParameters {
    fetchStoryId: (url: string) => Promise<StoryRef>;
    render: ({
        element,
        onChange,
        onRemove,
    }: {
        isSelected: boolean;
        element: StoryEmbedNode;
        onChange: (props: Partial<StoryEmbedNode>) => void;
        onRemove: () => void;
    }) => ReactNode;
}
