import type { ReactNode, RefObject } from 'react';
import React from 'react';

import { FloatingContainer } from '#modules/components';

import styles from './FloatingSnippetInput.module.scss';

interface Props {
    availableWidth: number;
    containerRef: RefObject<HTMLDivElement>;
    onClose: () => void;
    onRootClose: () => void;
    renderInput: () => ReactNode;
}

export function FloatingSnippetInput({
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
