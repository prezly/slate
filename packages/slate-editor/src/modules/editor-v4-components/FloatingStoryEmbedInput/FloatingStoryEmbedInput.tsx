import type { ReactNode, RefObject } from 'react';
import React from 'react';

import { FloatingContainer } from '#modules/editor-v4-components';

import styles from './FloatingStoryEmbedInput.module.scss';

interface Props {
    availableWidth: number;
    containerRef: RefObject<HTMLDivElement>;
    onClose: () => void;
    onRootClose: () => void;
    renderInput: () => ReactNode;
}

export function FloatingStoryEmbedInput({
    availableWidth,
    containerRef,
    onClose,
    onRootClose,
    renderInput,
}: Props) {
    return (
        <FloatingContainer.Container
            availableWidth={availableWidth}
            className={styles['editor-v4-floating-story-embed-input']}
            containerRef={containerRef}
            onClose={onRootClose}
            open
            show
        >
            <FloatingContainer.Button
                className={styles['editor-v4-floating-story-embed-input__close-button']}
                onClick={onClose}
                open
            />
            {renderInput()}
        </FloatingContainer.Container>
    );
}
