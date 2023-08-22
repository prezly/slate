import React from 'react';
import { useSlateStatic } from 'slate-react';

import { PlaceholderSocialPost } from '#icons';
import { URL_WITH_OPTIONAL_PROTOCOL_REGEXP, useFunction } from '#lib';

import type { EmbedNode } from '#extensions/embed';
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
    element: PlaceholderNode<PlaceholderNode.Type.SOCIAL_POST>;
    fetchOembed: FetchOEmbedFn;
}

export function SocialPostPlaceholderElement({
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

    return (
        <InputPlaceholderElement
            {...props}
            element={element}
            // Core
            format={format}
            icon={PlaceholderSocialPost}
            title={Title}
            description={Description}
            // Input
            inputTitle="Social media post"
            inputDescription="Paste a social media link and hit Enter"
            inputPattern={URL_WITH_OPTIONAL_PROTOCOL_REGEXP.source}
            inputPlaceholder="https://twitter.com/tweet"
            inputAction="Add link"
            onSubmit={handleSubmit}
        >
            {children}
        </InputPlaceholderElement>
    );
}

function Title(props: { isLoading: boolean }) {
    if (props.isLoading) {
        return <>{withLoadingDots('Embedding social media post')}</>;
    }
    return <>Click to embed a social media post</>;
}

function Description(props: { isLoading: boolean }) {
    if (props.isLoading) {
        return null;
    }
    return <>Add a tweet, Facebook or Instagram post in your story</>;
}
