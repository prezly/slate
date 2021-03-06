import { EditorCommands, useSavedSelection } from '@prezly/slate-commons';
import { useState } from 'react';
import { ReactEditor } from 'slate-react';

import { EventsEditor } from '../../../modules/editor-v4-events';
import { PressContact } from '../../../types';

import createPressContact from './createPressContact';

interface State {
    isOpen: boolean;
}

interface Actions {
    close: () => void;
    open: () => void;
    rootClose: () => void;
    submit: (contact: PressContact) => void;
}

const useFloatingPressContactsMenu = (editor: ReactEditor): [State, Actions] => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const savedSelection = useSavedSelection();

    const close = () => {
        savedSelection.restore(editor, { focus: true });
        setIsOpen(false);
    };

    const rootClose = () => {
        setIsOpen(false);
    };

    const open = () => {
        EventsEditor.dispatchEvent(editor, 'contact-dialog-opened');
        setIsOpen(true);
        savedSelection.save(editor);
    };

    const submit = (contact: PressContact) => {
        EventsEditor.dispatchEvent(editor, 'contact-dialog-submitted', { contact_id: contact.id });
        close();
        savedSelection.restore(editor, { focus: true });
        EditorCommands.insertNodes(editor, [createPressContact(contact)], {
            ensureEmptyParagraphAfter: true,
        });
    };

    return [{ isOpen }, { close, open, rootClose, submit }];
};

export default useFloatingPressContactsMenu;
