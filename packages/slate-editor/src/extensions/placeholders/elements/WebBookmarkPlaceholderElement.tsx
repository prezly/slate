import type { BookmarkNode } from '@prezly/slate-types';
import React from 'react';
import { useSlateStatic } from 'slate-react';

import { PlaceholderWebBookmark } from '#icons';
import { useFunction } from '#lib';

import { createWebBookmark } from '#extensions/web-bookmark';
import { EventsEditor } from '#modules/events';

import {
    type Props as BaseProps,
    InputPlaceholderElement,
} from '../components/InputPlaceholderElement';
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
        | 'inputPlaceholder'
        | 'inputAction'
        | 'onSubmit'
    > {
    element: PlaceholderNode<PlaceholderNode.Type.WEB_BOOKMARK>;
    fetchOembed: FetchOEmbedFn;
}

export function WebBookmarkPlaceholderElement({ children, element, fetchOembed, ...props }: Props) {
    const editor = useSlateStatic();

    const handleTrigger = useFunction(() => {
        PlaceholdersManager.activate(element);
    });

    const handleSubmit = useFunction(async (url: string) => {
        EventsEditor.dispatchEvent(editor, 'web-bookmark-dialog-submitted', {
            url,
            selectedItemText: 'Add bookmark',
        });

        const loading = fetchOembed(url).then(
            (oembed) => ({ oembed, url }),
            () => ({ url }), // `oembed` is undefined if an error occurred
        );

        PlaceholdersManager.register(element.type, element.uuid, loading);
        PlaceholdersManager.deactivateAll();
    });

    const handleData = useFunction(
        (data: { url: BookmarkNode['url']; oembed?: BookmarkNode['oembed'] }) => {
            if (!data.oembed) {
                EventsEditor.dispatchEvent(editor, 'notification', {
                    children: 'Provided URL does not exist or is not supported.',
                    type: 'error',
                });
                return;
            }
            replacePlaceholder(
                editor,
                element,
                createWebBookmark({
                    url: data.url,
                    oembed: data.oembed,
                }),
            );
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
            format="card"
            icon={PlaceholderWebBookmark}
            title="Click to insert a website bookmark"
            description="Insert a link to any website"
            // Input
            inputTitle="Website bookmark"
            inputDescription="Insert a website URL and hit Enter"
            inputPlaceholder="www.website.com"
            inputAction="Add bookmark"
            onSubmit={handleSubmit}
        >
            {children}
        </InputPlaceholderElement>
    );
}
