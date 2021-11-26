import type { OEmbedInfo } from '@prezly/sdk';
import { EditorCommands, useSavedSelection } from '@prezly/slate-commons';
import { useState } from 'react';
import type { Editor } from 'slate';

import { EventsEditor } from '../../../modules/editor-v4-events';
import {
    createLoader,
    findLoaderPath,
    LoaderContentType,
    loaderPromiseManager,
    removeLoader,
    replaceLoader,
} from '../../../modules/editor-v4-loader';

import { createWebBookmark } from './createWebBookmark';

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

const defaultFetchOembed = (): Promise<OEmbedInfo> => {
    // It should never happen, we just want useFloatingEmbedInput to be a no-op
    // when fetchOembed is not provided (which implies that embeds are not enabled).
    return Promise.reject(new Error('Embeds are not enabled'));
};

export function useFloatingWebBookmarkInput(
    editor: Editor,
    fetchOembed: (url: string) => Promise<OEmbedInfo> = defaultFetchOembed,
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
        EventsEditor.dispatchEvent(editor, 'web-bookmark-dialog-opened', {
            selectedItemText: buttonLabel,
        });
        setSubmitButtonLabel(buttonLabel);
        setLoaderParameters(newLoaderParameters);
        setIsOpen(true);
        savedSelection.save(editor);
    }

    async function submit(href: string) {
        EventsEditor.dispatchEvent(editor, 'web-bookmark-submitted', {
            href,
            selectedItemText: submitButtonLabel,
        });

        close();
        savedSelection.restore(editor, { focus: true });

        const loader = createLoader(
            loaderParameters || {
                contentType: LoaderContentType.EMBED,
                message: 'Embedding',
            },
        );
        EditorCommands.insertNodes(editor, [loader], {
            ensureEmptyParagraphAfter: true
        });

        try {
            const oembedPromise = fetchOembed(href);
            loaderPromiseManager.track(loader.id, oembedPromise);
            const oembed = await oembedPromise;
            const element = createWebBookmark({ oembed, href });
            replaceLoader(editor, loader, element);
        } catch (error) {
            EventsEditor.dispatchEvent(editor, 'notification', {
                children: 'Provided URL does not exist or is not supported.',
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
