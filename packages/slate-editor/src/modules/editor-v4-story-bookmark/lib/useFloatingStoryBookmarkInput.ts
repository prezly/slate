import { EditorCommands, useSavedSelection } from '@prezly/slate-commons';
import type { StoryBookmarkNode } from '@prezly/slate-types';
import { useState } from 'react';
import type { Editor } from 'slate';

import { EventsEditor } from '#modules/editor-v4-events';
import {
    createLoader,
    findLoaderPath,
    LoaderContentType,
    removeLoader,
    replaceLoader,
} from '#modules/editor-v4-loader';

import { createStoryBookmark } from './createStoryBookmark';

interface State {
    isOpen: boolean;
    submitButtonLabel: string;
}

interface Actions {
    close: () => void;
    open: (buttonLabel: string, loaderParameters: Parameters<typeof createLoader>[0]) => void;
    rootClose: () => void;
    submit: (url: Pick<StoryBookmarkNode, 'story'> & Partial<StoryBookmarkNode>) => Promise<void>;
}

export function useFloatingStoryBookmarkInput(editor: Editor): [State, Actions] {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [submitButtonLabel, setSubmitButtonLabel] = useState<string>('');
    const [loaderParameters, setLoaderParameters] = useState<Parameters<typeof createLoader>[0]>();
    const savedSelection = useSavedSelection();

    function close() {
        savedSelection.restore(editor, { focus: true });
        setSubmitButtonLabel('');
        setIsOpen(false);
    }

    function rootClose() {
        setSubmitButtonLabel('');
        setIsOpen(false);
    }

    function open(buttonLabel: string, newLoaderParameters: Parameters<typeof createLoader>[0]) {
        EventsEditor.dispatchEvent(editor, 'story-bookmark-dialog-opened', {
            selectedItemText: buttonLabel,
        });
        setSubmitButtonLabel(buttonLabel);
        setLoaderParameters(newLoaderParameters);
        setIsOpen(true);
        savedSelection.save(editor);
    }

    async function submit(node: Pick<StoryBookmarkNode, 'story'> & Partial<StoryBookmarkNode>) {
        EventsEditor.dispatchEvent(editor, 'story-bookmark-dialog-submitted', {
            node: JSON.stringify(node),
            selectedItemText: submitButtonLabel,
        });

        close();
        savedSelection.restore(editor, { focus: true });

        const loader = createLoader(
            loaderParameters || {
                contentType: LoaderContentType.STORY_EMBED,
                message: 'Loading Prezly story',
            },
        );

        EditorCommands.insertNodes(editor, [loader], {
            ensureEmptyParagraphAfter: true,
        });

        try {
            const element = createStoryBookmark(node);
            replaceLoader(editor, loader, element);
        } catch (error) {
            EventsEditor.dispatchEvent(editor, 'notification', {
                children: 'Provided URL is not a Prezly story.',
                type: 'error',
            });

            const loaderPath = findLoaderPath(editor, loader.id);
            if (loaderPath) {
                removeLoader(editor, loaderPath);
            }
        }
    }

    return [
        { isOpen, submitButtonLabel },
        { close, open, rootClose, submit },
    ];
}
