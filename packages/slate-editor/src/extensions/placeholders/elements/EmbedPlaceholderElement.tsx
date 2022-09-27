import type { EmbedNode } from '@prezly/slate-types';
import React from 'react';
import { useSlateStatic } from 'slate-react';

import { PlaceholderEmbed } from '#icons';
import { useFunction } from '#lib';

import { EventsEditor } from '#modules/events';

import { createEmbed } from '../../embed';
import {
    type Props as BaseProps,
    InputPlaceholderElement,
} from '../components/InputPlaceholderElement';
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
        | 'inputPlaceholder'
        | 'inputAction'
        | 'onSubmit'
    > {
    element: PlaceholderNode;
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

        PlaceholdersManager.register(PlaceholderNode.Type.EMBED, element.uuid, loading);
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
    usePlaceholderManagement(PlaceholderNode.Type.EMBED, element.uuid, {
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
            title="Click to insert an embed"
            description="Embed any type of web content"
            // Input
            inputTitle="Embed"
            inputDescription="Insert an embed URL and hit Enter"
            inputPlaceholder="https://media.giphy.com/GIF"
            inputAction="Add embed"
            onSubmit={handleSubmit}
        >
            {children}
        </InputPlaceholderElement>
    );
}
