import type { ReactNode, RefObject } from 'react';
import React, { memo } from 'react';

import { FloatingContainer } from '#modules/components';

import styles from './FloatingSnippetInput.module.scss';

interface Props {
    availableWidth: number;
    containerRef: RefObject<HTMLDivElement>;
    onClose: () => void;
    onRootClose: () => void;
    renderInput: () => ReactNode;
}

function FloatingSnippetInputComponent({
    availableWidth,
    containerRef,
    onClose,
    onRootClose,
    renderInput,
}: Props) {
    return (
        <FloatingContainer.Container
            availableWidth={availableWidth}
            className={styles.FloatingSnippetInput}
            containerRef={containerRef}
            onClose={onRootClose}
            open
            show
        >
            <FloatingContainer.Button className={styles.CloseButton} onClick={onClose} open />
            {renderInput()}
        </FloatingContainer.Container>
    );
}

export const FloatingSnippetInput = memo(FloatingSnippetInputComponent);
