import type { VideoNode } from '@prezly/slate-types';
import type { PrezlyFileInfo } from '@prezly/uploadcare';
import { toProgressPromise, UploadcareFile } from '@prezly/uploadcare';
import uploadcare from '@prezly/uploadcare-widget';
import type { DragEvent } from 'react';
import React from 'react';
import { useSlateStatic } from 'slate-react';

import { PlaceholderVideo } from '#icons';
import { URL_WITH_OPTIONAL_PROTOCOL_REGEXP, useFunction } from '#lib';

import { createVideoBookmark, VIDEO_TYPES } from '#extensions/video';
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
    element: PlaceholderNode<PlaceholderNode.Type.VIDEO>;
    fetchOembed: FetchOEmbedFn;
}

export function VideoPlaceholderElement({ children, element, fetchOembed, format, ...props }: Props) {
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

    const handleDrop = useFunction((event: DragEvent) => {
        event.preventDefault();
        event.stopPropagation();

        const [video] = Array.from(event.dataTransfer.files)
            .filter((file) => VIDEO_TYPES.includes(file.type))
            .slice(0, 1)
            .map((file) => uploadcare.fileFrom('object', file));

        if (video) {
            const uploading = toProgressPromise(video).then(async (fileInfo: PrezlyFileInfo) => {
                const file = UploadcareFile.createFromUploadcareWidgetPayload(fileInfo);
                const url = file.cdnUrl;
                const oembed = await fetchOembed(url);
                if (oembed.type === 'video') {
                    return { oembed, url };
                }
                return { url };
            });
            PlaceholdersManager.register(element.type, element.uuid, uploading);
        }
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
            format={format || "16:9"}
            icon={PlaceholderVideo}
            title={Title}
            description={Description}
            // Input
            inputTitle="Video"
            inputDescription="Paste a video link or drop a video file (MP4, OGG or WEBM) inside this card"
            inputPattern={URL_WITH_OPTIONAL_PROTOCOL_REGEXP.source}
            inputPlaceholder="https://youtube.com/video"
            inputAction="Add video"
            onDrop={handleDrop}
            onSubmit={handleSubmit}
        >
            {children}
        </InputPlaceholderElement>
    );
}

function Title(props: { isDragOver: boolean; isLoading: boolean }) {
    if (props.isLoading) {
        return <>{withLoadingDots('Uploading video')}</>;
    }
    if (props.isDragOver) {
        return <>Drop a video here</>;
    }
    return <>Drag or click to upload a video</>;
}

function Description(props: { isLoading: boolean }) {
    if (props.isLoading) {
        return null;
    }
    return <>Drop a video file (MP4, OGG or WEBM) or click to insert a video URL</>;
}
