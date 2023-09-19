import type { NewsroomRef } from '@prezly/sdk';
import type { GalleryNode } from '@prezly/slate-types';
import { awaitUploads, UPLOADCARE_FILE_DATA_KEY, UploadcareImage } from '@prezly/uploadcare';
import { noop } from '@technically/lodash';
import React, { useState } from 'react';
import type { Editor } from 'slate';
import { Transforms } from 'slate';
import type { RenderElementProps } from 'slate-react';
import { useSlateStatic } from 'slate-react';

import { EditorBlock } from '#components';
import { useLatest, useSize } from '#lib';

import type { MediaGalleryOptions } from '#modules/uploadcare';
import { UploadcareEditor } from '#modules/uploadcare';

import { shuffleImages } from '../lib';
import { updateGallery } from '../transforms';

import { Gallery } from './Gallery';
import { GalleryMenu } from './GalleryMenu';

interface Props extends RenderElementProps {
    availableWidth: number;
    element: GalleryNode;
    onEdit?: (gallery: GalleryNode) => void;
    onEdited?: (
        gallery: GalleryNode,
        extra: {
            successfulUploads: number;
            failedUploads: Error[];
        },
    ) => void;
    onShuffled?: (updated: GalleryNode, original: GalleryNode) => void;
    withMediaGalleryTab: false | { enabled: true; newsroom: NewsroomRef };
    withLayoutOptions: boolean;
}

export function GalleryElement({
    availableWidth,
    attributes,
    children,
    element,
    onEdit = noop,
    onEdited = noop,
    onShuffled = noop,
    withMediaGalleryTab,
    withLayoutOptions,
}: Props) {
    const editor = useSlateStatic();
    const [sizer, size] = useSize(Sizer, { width: availableWidth });
    const [isUploading, setUploading] = useState(false);
    const callbacks = useLatest({ onEdit, onEdited, onShuffled });

    async function handleEdit() {
        callbacks.current.onEdit(element);

        const files = element.images.map(({ caption, file }) => {
            const uploadcareImage = UploadcareImage.createFromPrezlyStoragePayload(file);
            uploadcareImage[UPLOADCARE_FILE_DATA_KEY] = { caption };
            return uploadcareImage;
        });

        async function upload() {
            const filePromises = await UploadcareEditor.upload(editor, {
                ...getMediaGalleryParameters(withMediaGalleryTab),
                captions: true,
                files,
                imagesOnly: true,
                multiple: true,
            });

            if (!filePromises) {
                return undefined;
            }

            return awaitUploads(filePromises);
        }

        setUploading(true);

        try {
            const result = await upload();

            if (!result) {
                return;
            }

            const { successfulUploads, failedUploads } = result;

            const images = successfulUploads.map((fileInfo) => {
                const image = UploadcareImage.createFromUploadcareWidgetPayload(fileInfo);
                return {
                    caption: fileInfo[UPLOADCARE_FILE_DATA_KEY]?.caption || '',
                    file: image.toPrezlyStoragePayload(),
                };
            });

            Transforms.setNodes<GalleryNode>(
                editor,
                { images },
                { match: (node) => node === element },
            );

            callbacks.current.onEdited(element, {
                successfulUploads: successfulUploads.length,
                failedUploads,
            });
        } finally {
            setUploading(false);
        }
    }

    function handleShuffle() {
        const update = {
            images: shuffleImages(element.images),
        };

        updateGallery(editor, update);

        callbacks.current.onShuffled(element, { ...element, ...update });
    }

    return (
        <EditorBlock
            {...attributes}
            element={element}
            layout={withLayoutOptions ? element.layout : undefined}
            loading={isUploading}
            // We have to render children or Slate will fail when trying to find the node.
            renderAboveFrame={children}
            renderReadOnlyFrame={() => (
                <>
                    {sizer}
                    <Gallery
                        images={element.images.map((image) =>
                            UploadcareImage.createFromPrezlyStoragePayload(image.file),
                        )}
                        padding={element.padding}
                        size={element.thumbnail_size}
                        width={size.width}
                    />
                </>
            )}
            renderMenu={({ onClose }) => (
                <GalleryMenu
                    element={element}
                    onEdit={handleEdit}
                    onShuffle={handleShuffle}
                    onClose={onClose}
                    withLayoutOptions={withLayoutOptions}
                />
            )}
            void
        />
    );
}

function Sizer() {
    return <div />;
}

function getMediaGalleryParameters(
    withMediaGalleryTab: Props['withMediaGalleryTab'],
): MediaGalleryOptions<true> | MediaGalleryOptions<false> {
    if (withMediaGalleryTab) {
        return {
            mediaGalleryTab: true,
            newsroom: withMediaGalleryTab.newsroom,
        };
    }

    return {
        mediaGalleryTab: false,
    };
}
