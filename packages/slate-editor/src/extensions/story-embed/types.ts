import type { StoryEmbedNode } from '@prezly/slate-types';
import type { ComponentType } from 'react';

export interface StoryEmbedExtensionParameters {
    renderInput: ComponentType<{
        onSubmit: (props: Pick<StoryEmbedNode, 'story'> & Partial<StoryEmbedNode>) => void;
        onClose: () => void;
    }>;
    render: ComponentType<{
        isSelected: boolean;
        element: StoryEmbedNode;
        onChange: (props: Partial<StoryEmbedNode>) => void;
        onRemove: () => void;
    }>;
}
