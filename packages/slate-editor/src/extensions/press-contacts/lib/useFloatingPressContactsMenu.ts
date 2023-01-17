import type { NewsroomContact } from '@prezly/sdk';
import { EditorCommands, useSavedSelection } from '@prezly/slate-commons';
import type { PressContact } from '@prezly/slate-types';
import { useState } from 'react';
import type { Editor } from 'slate';

import { EventsEditor } from '#modules/events';

import { createPressContact } from './createPressContact';

interface State {
    isOpen: boolean;
}

interface Actions {
    close: () => void;
    open: () => void;
    rootClose: () => void;
    submit: (id: NewsroomContact['uuid'], contact: PressContact) => void;
}

export function useFloatingPressContactsMenu(editor: Editor): [State, Actions] {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const savedSelection = useSavedSelection();

    function close() {
        savedSelection.restore(editor, { focus: true });
        setIsOpen(false);
    }

    function rootClose() {
        setIsOpen(false);
    }

    function open() {
        EventsEditor.dispatchEvent(editor, 'contact-dialog-opened');
        setIsOpen(true);
        savedSelection.save(editor);
    }

    function submit(id: NewsroomContact['uuid'], contact: PressContact) {
        EventsEditor.dispatchEvent(editor, 'contact-dialog-submitted', {
            contact_id: id,
        });
        close();
        savedSelection.restore(editor, { focus: true });
        EditorCommands.insertNodes(editor, [createPressContact({ contact })], {
            ensureEmptyParagraphAfter: true,
        });
    }

    return [{ isOpen }, { close, open, rootClose, submit }];
}
