import React from 'react';
import { useSlateStatic } from 'slate-react';

import { PlaceholderEmbed } from '#icons';
import { URL_WITH_OPTIONAL_PROTOCOL_REGEXP, useFunction } from '#lib';

import { createEmbed, type EmbedNode } from '#extensions/embed';
import { EventsEditor } from '#modules/events';

import {
    type Props as BaseProps,
    InputPlaceholderElement,
} from '../components/InputPlaceholderElement';
import { withLoadingDots } from '../components/LoadingDots';
import { replacePlaceholder } from '../lib';
import { PlaceholderNode } from '../PlaceholderNode';
import { PlaceholdersManager, usePlaceholderManagement } from '../PlaceholdersManager';
import type { FetchOEmbedFn } from '../types';

interface Props
    extends Omit<
        BaseProps,
        | 'icon'
        | 'title'
        | 'description'
        | 'onDrop'
        | 'inputTitle'
        | 'inputDescription'
        | 'inputPattern'
        | 'inputPlaceholder'
        | 'inputType'
        | 'inputAction'
        | 'onSubmit'
    > {
    element: PlaceholderNode<PlaceholderNode.Type.EMBED>;
    fetchOembed: FetchOEmbedFn;
}

export function EmbedPlaceholderElement({
    children,
    element,
    fetchOembed,
    format = 'card-lg',
    ...props
}: Props) {
    const editor = useSlateStatic();

    const handleTrigger = useFunction(() => {
        PlaceholdersManager.activate(element);
    });

    const handleSubmit = useFunction(async (url: string) => {
        EventsEditor.dispatchEvent(editor, 'embed-placeholder-submitted', { url });

        const loading = fetchOembed(url).then(
            (oembed) => ({ oembed, url }),
            () => ({ url }), // `oembed` is undefined if an error occurred
        );

        PlaceholdersManager.register(element.type, element.uuid, loading);
        PlaceholdersManager.deactivateAll();
    });

    const handleData = useFunction(
        (data: { url: EmbedNode['url']; oembed?: EmbedNode['oembed'] }) => {
            const { url, oembed } = data;
            if (oembed) {
                replacePlaceholder(editor, element, createEmbed({ url, oembed }));
                return;
            }
            EventsEditor.dispatchEvent(editor, 'notification', {
                children: 'Provided URL does not exist or is not supported.',
                type: 'error',
            });
        },
    );
    usePlaceholderManagement(element.type, element.uuid, {
        onTrigger: handleTrigger,
        onResolve: handleData,
    });

    function render(
        override: Partial<
            Pick<
                BaseProps,
                | 'inputTitle'
                | 'inputAction'
                | 'inputDescription'
                | 'inputPlaceholder'
                | 'title'
                | 'description'
            >
        > = {},
    ) {
        const {
            description,
            inputAction = 'Add embed',
            inputDescription = 'Insert an embed URL and hit Enter',
            inputPlaceholder = 'media.giphy.com/GIF',
            inputTitle = 'Embed',
            title,
        } = override;

        return (
            <InputPlaceholderElement
                {...props}
                element={element}
                // Core
                format={format}
                icon={PlaceholderEmbed}
                title={title}
                description={description}
                // Input
                inputTitle={inputTitle}
                inputDescription={inputDescription}
                inputPattern={URL_WITH_OPTIONAL_PROTOCOL_REGEXP.source}
                inputPlaceholder={inputPlaceholder}
                inputAction={inputAction}
                onSubmit={handleSubmit}
            >
                {children}
            </InputPlaceholderElement>
        );
    }

    if (element.provider === PlaceholderNode.Provider.DROPBOX) {
        return render({
            inputTitle: 'Dropbox embed',
            inputDescription: 'Paste a link and hit Enter',
            inputPlaceholder: 'https://www.dropbox.com/s/file/',
            inputAction: 'Add embed',
            title: (props) => <Title {...props} text="Click to insert a Dropbox embed" />,
            description: (props) => <Description {...props} text="Add using a social media link" />,
        });
    }

    return render();
}

function Title({
    isLoading,
    text = 'Click to insert an embed',
}: {
    isLoading: boolean;
    text?: string;
}) {
    if (isLoading) {
        return <>{withLoadingDots('Embedding content')}</>;
    }
    return <>{text}</>;
}

function Description({
    isLoading,
    text = 'Add any web content like a GIF or Spotify song',
}: {
    isLoading: boolean;
    text: string;
}) {
    if (isLoading) {
        return null;
    }
    return <>{text}</>;
}
