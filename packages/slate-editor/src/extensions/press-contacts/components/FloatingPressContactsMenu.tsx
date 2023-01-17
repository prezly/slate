import type { Events } from '@prezly/events';
import type { NewsroomContact } from '@prezly/sdk';
import type { PressContact } from '@prezly/slate-types';
import { once } from 'lodash-es';
import type { ReactNode, RefObject } from 'react';
import React, { useMemo } from 'react';
import type { Editor } from 'slate';
import { useSlate } from 'slate-react';

import { FloatingContainer } from '#modules/components';
import type { EditorEventMap } from '#modules/events';
import { EventsEditor } from '#modules/events';

import type { SearchProps } from '../types';

import styles from './FloatingPressContactsMenu.module.scss';

interface Props {
    availableWidth: number;
    containerRef: RefObject<HTMLDivElement>;
    events: Events<EditorEventMap>;
    renderSearch: (searchProps: SearchProps) => ReactNode;
    onClose: () => void;
    onRootClose: () => void;
    onSubmit: (id: NewsroomContact['uuid'], contact: PressContact) => void;
}

function trackSearchUsed(editor: Editor) {
    return EventsEditor.dispatchEvent(editor, 'contact-dialog-search-used');
}

export function FloatingPressContactsMenu({
    availableWidth,
    containerRef,
    renderSearch,
    onClose,
    onRootClose,
    onSubmit,
}: Props) {
    const editor = useSlate();

    const trackSearchUsedOnce = useMemo(() => once(trackSearchUsed), []);

    function handleInputChange(query: string) {
        if (query) {
            trackSearchUsedOnce(editor);
        }
    }

    return (
        <FloatingContainer.Container
            availableWidth={availableWidth}
            className={styles.menu}
            containerRef={containerRef}
            onClose={onRootClose}
            open
            show
        >
            <FloatingContainer.Button className={styles.closeButton} onClick={onClose} open />

            {renderSearch({
                onChange: handleInputChange,
                onClose,
                onSubmit,
            })}
        </FloatingContainer.Container>
    );
}
