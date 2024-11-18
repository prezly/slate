import { EditorCommands, useSavedSelection } from '@prezly/slate-commons';
import type { DocumentNode } from '@prezly/slate-types';
import type { SlateEditor } from '@udecode/plate-common';
import { useState } from 'react';

import { EventsEditor } from '#modules/events';

interface State {
    isOpen: boolean;
}

interface Actions {
    close: () => void;
    open: () => void;
    rootClose: () => void;
    submit: (node: DocumentNode) => Promise<void>;
}

export function useFloatingSnippetInput(editor: SlateEditor): [State, Actions] {
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
        EventsEditor.dispatchEvent(editor, 'snippet-dialog-opened');
        setIsOpen(true);
        savedSelection.save(editor);
    }

    async function submit(node: DocumentNode) {
        EventsEditor.dispatchEvent(editor, 'snippet-dialog-submitted');

        close();

        try {
            if (!editor.selection) {
                return;
            }

            EditorCommands.insertNodes(editor, node.children, { mode: 'highest' });

            // TODO: Fix this!
            // editor.flash(node.children.at(0), node.children.at(-1));
            savedSelection.restore(editor, { focus: true });
        } catch (error) {
            console.error(error);
            EventsEditor.dispatchEvent(editor, 'notification', {
                children: 'Cannot insert snippet.',
                type: 'error',
            });
        }
    }

    return [{ isOpen }, { close, open, rootClose, submit }];
}
