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
        override: {
            title?: string;
            description?: string;
            placeholder?: string;
            action?: string;
        } = {},
    ) {
        const {
            title = 'Embed',
            description = 'Insert an embed URL and hit Enter',
            placeholder = 'media.giphy.com/GIF',
            action = 'Add embed',
        } = override;

        return (
            <InputPlaceholderElement
                {...props}
                element={element}
                // Core
                format={format}
                icon={PlaceholderEmbed}
                title={Title}
                description={Description}
                // Input
                inputTitle={title}
                inputDescription={description}
                inputPattern={URL_WITH_OPTIONAL_PROTOCOL_REGEXP.source}
                inputPlaceholder={placeholder}
                inputAction={action}
                onSubmit={handleSubmit}
            >
                {children}
            </InputPlaceholderElement>
        );
    }

    if (element.provider === PlaceholderNode.Provider.INSTAGRAM) {
        return render({
            title: 'Instagram',
            description: 'Insert an Instagram URL and hit Enter',
            placeholder: 'https://www.instagram.com/p/Cr-y_XyOyL9/',
            action: 'Embed',
        });
    }

    return render();
}

function Title(props: { isLoading: boolean }) {
    if (props.isLoading) {
        return <>{withLoadingDots('Embedding content')}</>;
    }
    return <>Click to insert an embed</>;
}

function Description(props: { isLoading: boolean }) {
    if (props.isLoading) {
        return null;
    }
    return <>Add any web content like a GIF or Spotify song</>;
}
