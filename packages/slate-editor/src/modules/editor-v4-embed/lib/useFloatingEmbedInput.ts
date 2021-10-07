import { OEmbedInfo } from '@prezly/sdk';
import { EditorCommands, useSavedSelection } from '@prezly/slate-commons';
import { useState } from 'react';
import { Editor } from 'slate';

import { EventsEditor } from '../../../modules/editor-v4-events';
import {
    createLoader,
    findLoaderPath,
    LoaderContentType,
    loaderPromiseManager,
    removeLoader,
    replaceLoader,
} from '../../../modules/editor-v4-loader';

import createEmbed from './createEmbed';

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

const defaultFetchOembed = (_url: string): Promise<OEmbedInfo> => {
    // It should never happen, we just want useFloatingEmbedInput to be a no-op
    // when fetchOembed is not provided (which implies that embeds are not enabled).
    return Promise.reject(new Error('Embeds are not enabled'));
};

const useFloatingEmbedInput = (
    editor: Editor,
    fetchOembed: (url: string) => Promise<OEmbedInfo> = defaultFetchOembed,
): [State, Actions] => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [submitButtonLabel, setSubmitButtonLabel] = useState<string>('');
    const [loaderParameters, setLoaderParameters] = useState<Parameters<typeof createLoader>[0]>();
    const savedSelection = useSavedSelection();

    const close = () => {
        savedSelection.restore(editor, { focus: true });
        setSubmitButtonLabel('');
        setIsOpen(false);
    };

    const rootClose = () => {
        setSubmitButtonLabel('');
        setIsOpen(false);
    };

    const open = (buttonLabel: string, newLoaderParameters: Parameters<typeof createLoader>[0]) => {
        EventsEditor.dispatchEvent(editor, 'embed-dialog-opened', {
            selectedItemText: buttonLabel,
        });
        setSubmitButtonLabel(buttonLabel);
        setLoaderParameters(newLoaderParameters);
        setIsOpen(true);
        savedSelection.save(editor);
    };

    const submit = async (url: string) => {
        EventsEditor.dispatchEvent(editor, 'embed-dialog-submitted', {
            url,
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
        EditorCommands.insertNodes(editor, [loader], { ensureEmptyParagraphAfter: true });

        try {
            const oembedPromise = fetchOembed(url);
            loaderPromiseManager.track(loader.id, oembedPromise);
            const oembed = await oembedPromise;
            const element = createEmbed(oembed, url);
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
    };

    return [
        { isOpen, submitButtonLabel },
        { close, open, rootClose, submit },
    ];
};

export default useFloatingEmbedInput;
