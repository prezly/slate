import type { BookmarkNode } from '@prezly/slate-types';
import React from 'react';
import { useSlateStatic } from 'slate-react';

import { PlaceholderWebBookmark } from '#icons';
import { URL_WITH_OPTIONAL_PROTOCOL_REGEXP, useFunction } from '#lib';

import { createLink } from '#extensions/inline-links';
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

export function WebBookmarkPlaceholderElement({
    children,
    element,
    fetchOembed,
    format = 'card',
    ...props
}: Props) {
    const editor = useSlateStatic();

    const handleTrigger = useFunction(() => {
        PlaceholdersManager.activate(element);
    });

    const handleSubmit = useFunction(async (url: string) => {
        EventsEditor.dispatchEvent(editor, 'web-bookmark-placeholder-submitted', { url });

        const loading = fetchOembed(url).then(
            (oembed) => ({ oembed, url }),
            () => ({ url }), // `oembed` is undefined if an error occurred
        );

        PlaceholdersManager.register(element.type, element.uuid, loading);
        PlaceholdersManager.deactivateAll();
    });

    const handleData = useFunction(
        (data: {
            url: BookmarkNode['url'];
            oembed?: BookmarkNode['oembed'];
            fallback?: 'link';
        }) => {
            const { url, oembed, fallback } = data;
            if (!oembed) {
                EventsEditor.dispatchEvent(editor, 'notification', {
                    children: 'Provided URL does not exist or is not supported.',
                    type: 'error',
                });
                if (fallback === 'link') {
                    replacePlaceholder(
                        editor,
                        element,
                        editor.createDefaultTextBlock({
                            children: [createLink({ href: url })],
                        }),
                    );
                }
                return;
            }
            replacePlaceholder(editor, element, createWebBookmark({ url, oembed }));
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
            format={format}
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
