import type { VideoNode } from '@prezly/slate-types';
import React from 'react';
import { useSlateStatic } from 'slate-react';

import { PlaceholderVideo } from '#icons';
import { URL_WITH_OPTIONAL_PROTOCOL_REGEXP, useFunction } from '#lib';

import { createVideoBookmark } from '#extensions/video';
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
        | 'inputPattern'
        | 'inputPlaceholder'
        | 'inputType'
        | 'inputAction'
        | 'onSubmit'
    > {
    element: PlaceholderNode<PlaceholderNode.Type.VIDEO>;
    fetchOembed: FetchOEmbedFn;
}

export function VideoPlaceholderElement({ children, element, fetchOembed, ...props }: Props) {
    const editor = useSlateStatic();

    const handleTrigger = useFunction(() => {
        PlaceholdersManager.activate(element);
    });

    const handleSubmit = useFunction(async (url: string) => {
        EventsEditor.dispatchEvent(editor, 'video-dialog-submitted', {
            url,
            selectedItemText: 'Add video',
        });

        const loading = fetchOembed(url).then(
            (oembed) => {
                if (oembed.type === 'video') {
                    return { oembed, url };
                }
                return { url };
            },
            () => ({ url }), // `oembed` is undefined if an error occurred
        );

        PlaceholdersManager.register(element.type, element.uuid, loading);
        PlaceholdersManager.deactivateAll();
    });

    const handleData = useFunction(
        (data: { url: VideoNode['url']; oembed?: VideoNode['oembed'] }) => {
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
                createVideoBookmark({
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
            format="card-lg"
            icon={PlaceholderVideo}
            title={Title}
            description={Description}
            // Input
            inputTitle="Video"
            inputDescription="Paste a video link and hit Enter"
            inputPattern={URL_WITH_OPTIONAL_PROTOCOL_REGEXP.source}
            inputPlaceholder="https://youtube.com/video"
            inputAction="Add video"
            onSubmit={handleSubmit}
        >
            {children}
        </InputPlaceholderElement>
    );
}

function Title(props: { isLoading: boolean }) {
    if (props.isLoading) {
        return <>Uploading video...</>;
    }
    return <>Click to insert a video</>;
}

function Description(props: { isLoading: boolean }) {
    if (props.isLoading) {
        return null;
    }
    return <>Paste a video link and hit Enter</>;
}
