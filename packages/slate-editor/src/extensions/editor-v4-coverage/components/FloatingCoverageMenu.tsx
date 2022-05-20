import type { Coverage } from '@prezly/sdk';
import type { ReactNode, RefObject } from 'react';
import React, { useRef } from 'react';
import { useSlate } from 'slate-react';

import { FloatingContainer } from '#modules/editor-v4-components';
import { EventsEditor } from '#modules/editor-v4-events';

import type { SearchProps } from '../types';

import styles from './FloatingCoverageMenu.module.scss';

interface Props {
    availableWidth: number;
    containerRef: RefObject<HTMLDivElement>;
    onClose: () => void;
    onRootClose: () => void;
    onSubmit: (coverage: Coverage) => void;
    renderSearch: (searchProps: SearchProps) => ReactNode;
}

export function FloatingCoverageMenu({
    availableWidth,
    containerRef,
    onClose,
    onRootClose,
    onSubmit,
    renderSearch,
}: Props) {
    const editor = useSlate();
    const trackedSearchUsed = useRef<boolean>(false);

    function handleChange(query: string): void {
        // Only track `COVERAGE_DIALOG_SEARCH_USED` once per instance to avoid many similar events.
        if (!trackedSearchUsed.current && query.length !== 0) {
            trackedSearchUsed.current = true;
            EventsEditor.dispatchEvent(editor, 'coverage-dialog-search-used');
        }
    }

    return (
        <FloatingContainer.Container
            availableWidth={availableWidth}
            className={styles.FloatingCoverageMenu}
            containerRef={containerRef}
            onClose={onRootClose}
            open
            show
        >
            <FloatingContainer.Button className={styles.CloseButton} onClick={onClose} open />

            {renderSearch({
                onChange: handleChange,
                onSubmit,
            })}
        </FloatingContainer.Container>
    );
}
