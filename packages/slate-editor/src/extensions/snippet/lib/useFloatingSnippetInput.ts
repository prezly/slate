import { EditorCommands, useSavedSelection } from '@prezly/slate-commons';
import type { DocumentNode } from '@prezly/slate-types';
import type { SlateEditor } from '@udecode/plate-common';
import { useState } from 'react';

import { useFunction } from '#lib';

import { EventsEditor } from '#modules/events';

interface State {
    isOpen: boolean;
}

interface Actions {
    close: () => void;
    open: () => void;
    rootClose: () => void;
    submit: (node: DocumentNode) => void;
}

export function useFloatingSnippetInput(editor: SlateEditor): [State, Actions] {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const savedSelection = useSavedSelection();

    const close = useFunction(() => {
        savedSelection.restore(editor, { focus: true });
        setIsOpen(false);
    });

    const rootClose = useFunction(() => {
        setIsOpen(false);
    });

    const open = useFunction(() => {
        EventsEditor.dispatchEvent(editor, 'snippet-dialog-opened');
        setIsOpen(true);
        savedSelection.save(editor);
    });

    const submit = useFunction((node: DocumentNode) => {
        EventsEditor.dispatchEvent(editor, 'snippet-dialog-submitted');

        close();

        try {
            if (!editor.selection) {
                return;
            }

            EditorCommands.insertNodes(editor, node.children, { mode: 'highest' });

            editor.flash(node.children.at(0), node.children.at(-1));
            savedSelection.restore(editor, { focus: true });
        } catch (error) {
            console.error(error);
            EventsEditor.dispatchEvent(editor, 'notification', {
                children: 'Cannot insert snippet.',
                type: 'error',
            });
        }
    });

    return [{ isOpen }, { close, open, rootClose, submit }];
}
