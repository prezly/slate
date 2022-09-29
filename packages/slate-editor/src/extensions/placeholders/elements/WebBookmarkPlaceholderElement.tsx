import type { BookmarkNode } from '@prezly/slate-types';
import React from 'react';
import { useSlateStatic } from 'slate-react';

import { PlaceholderWebBookmark } from '#icons';
import { URL_WITH_OPTIONAL_PROTOCOL_REGEXP, useFunction } from '#lib';

import { createWebBookmark } from '#extensions/web-bookmark';
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
            title={Title}
            description={Description}
            // Input
            inputTitle="Website bookmark"
            inputPattern={URL_WITH_OPTIONAL_PROTOCOL_REGEXP.source}
            inputDescription="Paste a website URL and hit Enter"
            inputPlaceholder="www.website.com"
            inputAction="Add bookmark"
            onSubmit={handleSubmit}
        >
            {children}
        </InputPlaceholderElement>
    );
}

function Title(props: { isLoading: boolean }) {
    if (props.isLoading) {
        return <>{withLoadingDots('Creating website bookmark')}</>;
    }
    return <>Click to insert a website bookmark</>;
}

function Description(props: { isLoading: boolean }) {
    if (props.isLoading) {
        return null;
    }
    return <>Add a link from any website</>;
}
