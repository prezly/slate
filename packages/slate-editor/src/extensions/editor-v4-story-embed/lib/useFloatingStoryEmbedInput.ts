import { EditorCommands, useSavedSelection } from '@prezly/slate-commons';
import type { StoryEmbedNode } from '@prezly/slate-types';
import { useState } from 'react';
import type { Editor } from 'slate';

import {
    createLoader,
    findLoaderPath,
    LoaderContentType,
    removeLoader,
    replaceLoader,
} from '#extensions/editor-v4-loader';
import { EventsEditor } from '#modules/editor-v4-events';

import { createStoryEmbed } from './createStoryEmbed';

interface State {
    isOpen: boolean;
    submitButtonLabel: string;
}

interface Actions {
    close: () => void;
    open: (buttonLabel: string, loaderParameters: Parameters<typeof createLoader>[0]) => void;
    rootClose: () => void;
    submit: (url: Pick<StoryEmbedNode, 'story'> & Partial<StoryEmbedNode>) => Promise<void>;
}

export function useFloatingStoryEmbedInput(editor: Editor): [State, Actions] {
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
        EventsEditor.dispatchEvent(editor, 'story-embed-dialog-opened', {
            selectedItemText: buttonLabel,
        });
        setSubmitButtonLabel(buttonLabel);
        setLoaderParameters(newLoaderParameters);
        setIsOpen(true);
        savedSelection.save(editor);
    }

    async function submit(node: Pick<StoryEmbedNode, 'story'> & Partial<StoryEmbedNode>) {
        EventsEditor.dispatchEvent(editor, 'story-embed-dialog-submitted', {
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
            const element = createStoryEmbed(node);
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
