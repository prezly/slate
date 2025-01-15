import type { VideoNode } from '@prezly/slate-types';
import type { PrezlyFileInfo } from '@prezly/uploadcare';
import { toProgressPromise, UploadcareFile } from '@prezly/uploadcare';
import uploadcare from '@prezly/uploadcare-widget';
import { useEditorRef, useSelected } from '@udecode/plate/react';
import type { DragEvent } from 'react';
import React from 'react';

import { PlaceholderVideo } from '#icons';
import { URL_WITH_OPTIONAL_PROTOCOL_REGEXP, useFunction } from '#lib';

import { createLink } from '#extensions/inline-links';
import { VIDEO_TYPES } from '#extensions/video';
import { EventsEditor } from '#modules/events';

import {
    type Props as BaseProps,
    InputPlaceholderElement,
} from '../components/InputPlaceholderElement';
import { withLoadingDots } from '../components/LoadingDots';
import { handleOembed, replacePlaceholder } from '../lib';
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
    element: PlaceholderNode<PlaceholderNode.Type.VIDEO>;
    fetchOembed: FetchOEmbedFn;
    withImagePlaceholders?: boolean;
    withVideoPlaceholders?: boolean;
    withWebBookmarkPlaceholders?: boolean;
}

export function VideoPlaceholderElement({
    children,
    element,
    fetchOembed,
    format = '16:9',
    withImagePlaceholders = false,
    withVideoPlaceholders = false,
    withWebBookmarkPlaceholders = false,
    ...props
}: Props) {
    const editor = useEditorRef();
    const isSelected = useSelected();

    const handleTrigger = useFunction(() => {
        PlaceholdersManager.activate(element);
    });

    const handleSubmit = useFunction(async (url: string) => {
        EventsEditor.dispatchEvent(editor, 'video-placeholder-submitted', { url });

        const loading = fetchOembed(url).then(
            (oembed) => {
                return { oembed, url };
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
        (data: { url: VideoNode['url']; oembed?: VideoNode['oembed']; fallback?: 'link' }) => {
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
                        { select: isSelected },
                    );
                }
                return;
            }

            handleOembed(
                editor,
                element,
                { url, oembed },
                {
                    routeImages: withImagePlaceholders,
                    routeVideos: withVideoPlaceholders,
                    routeWebBookmarks: withWebBookmarkPlaceholders,
                    select: isSelected,
                },
            );
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
            inputTitle = 'Video',
            inputDescription = 'Paste a video link or drop a video file (MP4, OGG or WEBM) inside this card',
            inputPlaceholder = 'https://youtube.com/video',
            inputAction = 'Add video',
            title = Title,
            description = Description,
        } = override;

        return (
            <InputPlaceholderElement
                {...props}
                element={element}
                // Core
                format={format}
                icon={PlaceholderVideo}
                title={title}
                description={description}
                // Input
                inputTitle={inputTitle}
                inputDescription={inputDescription}
                inputPattern={URL_WITH_OPTIONAL_PROTOCOL_REGEXP.source}
                inputPlaceholder={inputPlaceholder}
                inputAction={inputAction}
                onDrop={handleDrop}
                onSubmit={handleSubmit}
            >
                {children}
            </InputPlaceholderElement>
        );
    }

    if (element.provider === PlaceholderNode.Provider.YOUTUBE) {
        return render({
            inputAction: 'Add video',
            inputDescription: 'Paste a video link and hit Enter',
            inputPlaceholder: 'https://youtube.com/video',
            inputTitle: 'YouTube video',
            title: (props) => <Title {...props} text="Click to insert a YouTube video" />,
            description: (props) => <Description {...props} text="Add using a video share link" />,
        });
    }

    if (element.provider === PlaceholderNode.Provider.VIMEO) {
        return render({
            inputAction: 'Add video',
            inputDescription: 'Paste a video link and hit Enter',
            inputPlaceholder: 'https://vimeo.com/video',
            inputTitle: 'Vimeo video',
            title: (props) => <Title {...props} text="Click to insert a Vimeo video" />,
            description: (props) => <Description {...props} text="Add using a video share link" />,
        });
    }

    if (element.provider === PlaceholderNode.Provider.TIKTOK) {
        return render({
            inputAction: 'Add video',
            inputDescription: 'Paste a video link and hit Enter',
            inputPlaceholder: 'https://www.tiktok.com/@user/video',
            inputTitle: 'TikTok video',
            title: (props) => <Title {...props} text="Click to insert a TikTok video" />,
            description: (props) => <Description {...props} text="Add using a video share link" />,
        });
    }
    return render();
}

function Title(props: { isDragOver: boolean; isLoading: boolean; text?: string }) {
    const { isLoading, isDragOver, text = 'Drag or click to upload a video' } = props;
    if (isLoading) {
        return <>{withLoadingDots('Uploading video')}</>;
    }
    if (isDragOver) {
        return <>Drop a video here</>;
    }
    return <>{text}</>;
}

function Description(props: { isLoading: boolean; text?: string }) {
    const {
        isLoading,
        text = 'Drop a video file (MP4, OGG or WEBM) or click to insert a video URL',
    } = props;
    if (isLoading) {
        return null;
    }
    return <>{text}</>;
}
