import type { StoryEmbedNode } from '@prezly/slate-types';
import type { ReactElement } from 'react';

export interface StoryEmbedExtensionParameters {
    render: (props: {
        isSelected: boolean;
        element: StoryEmbedNode;
        onChange: (props: Partial<StoryEmbedNode>) => void;
        onRemove: () => void;
    }) => ReactElement | null;
}
