import type { StoryEmbedNode } from '@prezly/slate-types';
import type { FunctionComponent, RefObject } from 'react';
import React from 'react';

import { FloatingContainer } from '#modules/editor-v4-components';
import './FloatingStoryEmbedInput.scss';

import type { StoryEmbedExtensionParameters } from '../../types';

interface Props {
    availableWidth: number;
    containerRef: RefObject<HTMLDivElement>;
    onClose: () => void;
    onRootClose: () => void;
    onSubmit: (url: Pick<StoryEmbedNode, 'story'> & Partial<StoryEmbedNode>) => Promise<void>;
    renderInput: StoryEmbedExtensionParameters['renderInput'];
}

export const FloatingStoryEmbedInput: FunctionComponent<Props> = ({
    availableWidth,
    containerRef,
    onClose,
    onRootClose,
    onSubmit,
    renderInput,
}) => {
    return (
        <FloatingContainer.Container
            availableWidth={availableWidth}
            className="editor-v4-floating-story-embed-input"
            containerRef={containerRef}
            onClose={onRootClose}
            open
            show
        >
            <FloatingContainer.Button
                className="editor-v4-floating-story-embed-input__close-button"
                onClick={onClose}
                open
            />
            {renderInput({ onCreate: onSubmit, onRemove: onClose })}
        </FloatingContainer.Container>
    );
};
