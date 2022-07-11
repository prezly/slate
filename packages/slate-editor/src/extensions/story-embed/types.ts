import type { StoryEmbedNode } from '@prezly/slate-types';
import type { ReactElement } from 'react';

export interface StoryEmbedExtensionParameters {
    renderInput: (props: {
        onSubmit: (props: Pick<StoryEmbedNode, 'story'> & Partial<StoryEmbedNode>) => void;
        onClose: () => void;
    }) => ReactElement | null;
    render: (props: {
        isSelected: boolean;
        element: StoryEmbedNode;
        onChange: (props: Partial<StoryEmbedNode>) => void;
        onRemove: () => void;
    }) => ReactElement | null;
}
