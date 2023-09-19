import { EditorCommands, useSavedSelection } from '@prezly/slate-commons';
import type { DocumentNode } from '@prezly/slate-types';
import { useCallback, useState } from 'react';
import { useSlateStatic } from 'slate-react';

import { EventsEditor } from '#modules/events';

export function useFloatingSnippetInput() {
    const editor = useSlateStatic();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const savedSelection = useSavedSelection();

    const open = useCallback(() => {
        EventsEditor.dispatchEvent(editor, 'snippet-dialog-opened');
        setIsOpen(true);
        savedSelection.save(editor);
    }, [editor, savedSelection]);

    const close = useCallback(() => {
        savedSelection.restore(editor, { focus: true });
        setIsOpen(false);
    }, [editor, savedSelection]);

    const rootClose = useCallback(() => {
        setIsOpen(false);
    }, []);

    async function submit(node: DocumentNode) {
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
    }

    return { isOpen, close, open, rootClose, submit };
}
