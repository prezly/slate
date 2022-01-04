import { ProgressPromise } from '@prezly/progress-promise';
import classNames from 'classnames';
import type { FunctionComponent, HTMLAttributes } from 'react';
import React, { useCallback } from 'react';
import type { RenderElementProps } from 'slate-react';
import { useSelected } from 'slate-react';

import { useAsyncProgress } from '#lib';
import { useMount, useUnmount } from '#lib';

import { LoadingPlaceholderV2 } from '../../../../components';
import { Attachment, Bookmark, Embed, Gallery, Image, Video } from '../../../../icons';
import { loaderPromiseManager } from '../../lib';
import type { LoaderContentType, LoaderNode } from '../../types';

import './LoaderElement.scss';

interface Props extends RenderElementProps {
    element: LoaderNode;
    onMount: () => void;
    onUnmount: () => void;
}

const ICONS: Record<LoaderContentType, FunctionComponent<HTMLAttributes<SVGElement>>> = {
    attachment: Attachment,
    bookmark: Bookmark,
    embed: Embed,
    gallery: Gallery,
    image: Image,
    video: Video,
};

const ESTIMATED_DURATIONS: Record<LoaderContentType, number> = {
    // Attachment can be of any size, hence more pessimistic estimation.
    // Once I saw someone attaching 1.4 GB movie to a story about some cars.
    attachment: 30000,
    // GET /v1/oembed endpoint usually responds in 500-1000 ms.
    bookmark: 500,
    // GET /v1/oembed endpoint usually responds in 500-1000 ms.
    embed: 500,
    // Images in gallery can be of any size and gallery can have any number of images.
    // I saw people uploading dozens of high-resolution images, so let's keep it large.
    gallery: 20000,
    // Again, quite pessimistic estimation because image can be of any size.
    image: 5000,
    // GET /v1/oembed endpoint usually responds in 500-1000 ms.
    video: 500,
};

export const LoaderElement: FunctionComponent<Props> = ({
    attributes,
    children,
    element,
    onMount,
    onUnmount,
}) => {
    const { id } = element;
    const isSelected = useSelected();
    const getPromise = useCallback(() => loaderPromiseManager.getPromise(id), [id]);
    const promise = getPromise();
    const { progress } = useAsyncProgress(getPromise, {
        loading: true,
        progress: promise instanceof ProgressPromise ? promise.getProgress() : 0,
    });

    useMount(onMount);
    useUnmount(onUnmount);

    return (
        <div
            {...attributes}
            className={classNames('editor-v4-loader-element', {
                'editor-v4-loader-element--active': isSelected,
            })}
            data-slate-type={element.type}
        >
            <LoadingPlaceholderV2
                contentEditable={false}
                estimatedDuration={ESTIMATED_DURATIONS[element.contentType]}
                progress={progress / 100}
            >
                {({ percent }) => (
                    <>
                        <LoadingPlaceholderV2.Icon icon={ICONS[element.contentType]} />
                        <LoadingPlaceholderV2.Description percent={percent}>
                            {element.message}
                        </LoadingPlaceholderV2.Description>
                        <LoadingPlaceholderV2.ProgressBar percent={percent} />
                    </>
                )}
            </LoadingPlaceholderV2>

            {/* We have to render children or Slate will fail when trying to find the node. */}
            {children}
        </div>
    );
};
