import type { StoryRef } from '@prezly/sdk';
import { EditorCommands, useSavedSelection } from '@prezly/slate-commons';
import { useState } from 'react';
import type { Editor } from 'slate';

import { EventsEditor } from '#modules/editor-v4-events';
import {
    createLoader,
    findLoaderPath,
    LoaderContentType,
    loaderPromiseManager,
    removeLoader,
    replaceLoader,
} from '#modules/editor-v4-loader';

import { createStoryEmbed } from './createStoryEmbed';

interface State {
    isOpen: boolean;
    submitButtonLabel: string;
}

interface Actions {
    close: () => void;
    open: (buttonLabel: string, loaderParameters: Parameters<typeof createLoader>[0]) => void;
    rootClose: () => void;
    submit: (url: string) => Promise<void>;
}

function defaultFetchStoryId(): Promise<StoryRef> {
    // It should never happen, we just want useFloatingEmbedInput to be a no-op
    // when fetchStoryId is not provided (which implies that embeds are not enabled).
    return Promise.reject(new Error('Story embeds are not enabled'));
}

export function useFloatingStoryEmbedInput(
    editor: Editor,
    fetchStoryId: (url: string) => Promise<StoryRef> = defaultFetchStoryId,
): [State, Actions] {
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

    async function submit(url: string) {
        EventsEditor.dispatchEvent(editor, 'story-embed-dialog-submitted', {
            url,
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
            const promise = fetchStoryId(url);
            loaderPromiseManager.track(loader.id, promise);
            const story = await promise;
            const element = createStoryEmbed({ story: { uuid: story.uuid } });
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
