import type { StoryEmbedNode } from '@prezly/slate-types';
import type { FunctionComponent } from 'react';

export interface StoryEmbedExtensionParameters {
    renderInput: FunctionComponent<{
        onSubmit: (props: Pick<StoryEmbedNode, 'story'> & Partial<StoryEmbedNode>) => void;
        onClose: () => void;
    }>;
    render: FunctionComponent<{
        isSelected: boolean;
        element: StoryEmbedNode;
        onChange: (props: Partial<StoryEmbedNode>) => void;
        onRemove: () => void;
    }>;
}
