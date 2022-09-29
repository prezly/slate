import type { EmbedNode } from '@prezly/slate-types';
import React from 'react';
import { useSlateStatic } from 'slate-react';

import { PlaceholderEmbed } from '#icons';
import { URL_WITH_OPTIONAL_PROTOCOL_REGEXP, useFunction } from '#lib';

import { createEmbed } from '#extensions/embed';
import { EventsEditor } from '#modules/events';

import {
    type Props as BaseProps,
    InputPlaceholderElement,
} from '../components/InputPlaceholderElement';
import { withLoadingDots } from '../components/LoadingDots';
import { replacePlaceholder } from '../lib';
import type { PlaceholderNode } from '../PlaceholderNode';
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

export function EmbedPlaceholderElement({ children, element, fetchOembed, ...props }: Props) {
    const editor = useSlateStatic();

    const handleTrigger = useFunction(() => {
        PlaceholdersManager.activate(element);
    });

    const handleSubmit = useFunction(async (url: string) => {
        EventsEditor.dispatchEvent(editor, 'embed-dialog-submitted', {
            url,
            selectedItemText: 'Add embed',
        });

        const loading = fetchOembed(url).then(
            (oembed) => ({ oembed, url }),
            () => ({ url }), // `oembed` is undefined if an error occurred
        );

        PlaceholdersManager.register(element.type, element.uuid, loading);
        PlaceholdersManager.deactivateAll();
    });

    const handleData = useFunction(
        (data: { url: EmbedNode['url']; oembed?: EmbedNode['oembed'] }) => {
            if (!data.oembed) {
                EventsEditor.dispatchEvent(editor, 'notification', {
                    children: 'Provided URL does not exist or is not supported.',
                    type: 'error',
                });
                return;
            }
            replacePlaceholder(editor, element, createEmbed(data.oembed, data.url));
        },
    );
    usePlaceholderManagement(element.type, element.uuid, {
        onTrigger: handleTrigger,
        onResolve: handleData,
    });

    return (
        <InputPlaceholderElement
            {...props}
            element={element}
            // Core
            format="card-lg"
            icon={PlaceholderEmbed}
            title={Title}
            description={Description}
            // Input
            inputTitle="Embed"
            inputDescription="Insert an embed URL and hit Enter"
            inputPattern={URL_WITH_OPTIONAL_PROTOCOL_REGEXP.source}
            inputPlaceholder="media.giphy.com/GIF"
            inputAction="Add embed"
            onSubmit={handleSubmit}
        >
            {children}
        </InputPlaceholderElement>
    );
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
