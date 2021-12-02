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

import { createVideoBookmark } from './createVideoBookmark';

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

export function useFloatingVideoInput(
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

    async function submit(url: string) {
        EventsEditor.dispatchEvent(editor, 'video-dialog-submitted', {
            url,
            selectedItemText: submitButtonLabel,
        });

        close();
        savedSelection.restore(editor, { focus: true });

        const loader = createLoader(
            loaderParameters || {
                contentType: LoaderContentType.VIDEO,
                message: 'Loading video',
            },
        );
        EditorCommands.insertNodes(editor, [loader], {
            ensureEmptyParagraphAfter: true,
        });

        let success = false;

        try {
            const oembedPromise = fetchOembed(url);
            loaderPromiseManager.track(loader.id, oembedPromise);
            const oembed = await oembedPromise;

            if (oembed.type === 'video') {
                const element = createVideoBookmark({ oembed, url });
                replaceLoader(editor, loader, element);
                success = true;
            }
        } finally {
            if (!success) {
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
    }

    return [
        { isOpen, submitButtonLabel },
        { close, open, rootClose, submit },
    ];
}
