import type { StoryEmbedNode } from '@prezly/slate-types';
import type { ReactNode } from 'react';

export interface StoryEmbedExtensionParameters {
    renderInput: ({
        onSubmit,
        onClose,
    }: {
        onSubmit: (props: Pick<StoryEmbedNode, 'story'> & Partial<StoryEmbedNode>) => void;
        onClose: () => void;
    }) => ReactNode;
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
