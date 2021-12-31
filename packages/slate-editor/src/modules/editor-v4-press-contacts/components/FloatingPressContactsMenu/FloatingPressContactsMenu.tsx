import type { Events } from '@prezly/events';
import type { PressContact } from '@prezly/slate-types';
import { once } from '#lodash';
import type { FunctionComponent, ReactNode, RefObject } from 'react';
import React, { useMemo } from 'react';
import type { Editor } from 'slate';
import { useSlate } from 'slate-react';

import { FloatingContainer } from '../../../../modules/editor-v4-components';
import type { EditorEventMap } from '../../../../modules/editor-v4-events';
import { EventsEditor } from '../../../../modules/editor-v4-events';

import type { SearchProps } from '../../types';

import './FloatingPressContactsMenu.scss';

interface Props {
    availableWidth: number;
    containerRef: RefObject<HTMLDivElement>;
    events: Events<EditorEventMap>;
    newsroomSettingsUrl: string;
    renderSearch: (searchProps: SearchProps) => ReactNode;
    onClose: () => void;
    onRootClose: () => void;
    onSubmit: (contact: PressContact) => void;
}

const trackSearchUsed = (editor: Editor) => {
    EventsEditor.dispatchEvent(editor, 'contact-dialog-search-used');
};

const FloatingPressContactsMenu: FunctionComponent<Props> = ({
    availableWidth,
    containerRef,
    newsroomSettingsUrl,
    renderSearch,
    onClose,
    onRootClose,
    onSubmit,
}) => {
    const editor = useSlate();

    const trackSearchUsedOnce = useMemo(() => once(trackSearchUsed), []);

    const handleInputChange = (query: string) => {
        if (query) {
            trackSearchUsedOnce(editor);
        }
    };

    return (
        <FloatingContainer
            availableWidth={availableWidth}
            className="editor-v4-floating-press-contacts-menu"
            containerRef={containerRef}
            onClose={onRootClose}
            open
            show
        >
            <FloatingContainer.Button
                className="editor-v4-floating-press-contacts-menu__close-button"
                onClick={onClose}
                open
            />

            {renderSearch({
                newsroomSettingsUrl,
                onChange: handleInputChange,
                onSubmit,
            })}
        </FloatingContainer>
    );
};

export default FloatingPressContactsMenu;
