import type { NewsroomRef } from '@prezly/sdk';
import type { GalleryNode } from '@prezly/slate-types';
import { awaitUploads, UPLOADCARE_FILE_DATA_KEY, UploadcareImage } from '@prezly/uploadcare';
import { noop } from '@technically/lodash';
import React from 'react';
import type { Editor } from 'slate';
import type { RenderElementProps } from 'slate-react';
import { useSlateStatic } from 'slate-react';

import { EditorBlock } from '#components';
import { useSize } from '#lib';

import { insertPlaceholder, PlaceholderNode, PlaceholdersManager } from '#extensions/placeholders';
import type { MediaGalleryOptions } from '#modules/uploadcare';
import { UploadcareEditor } from '#modules/uploadcare';

import { shuffleImages } from '../lib';
import { updateGallery } from '../transforms';

import { Gallery } from './Gallery';
import { GalleryMenu } from './GalleryMenu';

interface Props extends RenderElementProps {
    availableWidth: number;
    element: GalleryNode;
    onEdited?: (
        editor: Editor,
        gallery: GalleryNode,
        extra: {
            successfulUploads: number;
            failedUploads: Error[];
        },
    ) => void;
    onShuffled?: (editor: Editor, updated: GalleryNode, original: GalleryNode) => void;
    withMediaGalleryTab: false | { enabled: true; newsroom: NewsroomRef };
    withLayoutOptions: boolean;
}

export function GalleryElement({
    availableWidth,
    attributes,
    children,
    element,
    onEdited = noop,
    onShuffled = noop,
    withMediaGalleryTab,
    withLayoutOptions,
}: Props) {
    const editor = useSlateStatic();
    const [sizer, size] = useSize(Sizer, { width: availableWidth });

    async function handleEdit() {
        const files = element.images.map(({ caption, file }) => {
            const uploadcareImage = UploadcareImage.createFromPrezlyStoragePayload(file);
            uploadcareImage[UPLOADCARE_FILE_DATA_KEY] = { caption };
            return uploadcareImage;
        });

        const filePromises = await UploadcareEditor.upload(editor, {
            ...getMediaGalleryParameters(withMediaGalleryTab),
            captions: true,
            files,
            imagesOnly: true,
            multiple: true,
        });

        if (!filePromises) {
            return;
        }

        const placeholder = insertPlaceholder(editor, {
            type: PlaceholderNode.Type.GALLERY,
        });

        const uploading = awaitUploads(filePromises).then(
            ({ failedUploads, successfulUploads }) => {
                onEdited(editor, element, {
                    successfulUploads: successfulUploads.length,
                    failedUploads,
                });

                const images = successfulUploads.map((fileInfo) => {
                    const image = UploadcareImage.createFromUploadcareWidgetPayload(fileInfo);
                    return {
                        caption: fileInfo[UPLOADCARE_FILE_DATA_KEY]?.caption || '',
                        file: image.toPrezlyStoragePayload(),
                    };
                });

                return {
                    gallery: { ...element, images },
                    operation: 'edit' as const,
                };
            },
        );

        PlaceholdersManager.register(PlaceholderNode.Type.GALLERY, placeholder.uuid, uploading);
    }

    function handleShuffle() {
        const update = {
            images: shuffleImages(element.images),
        };

        updateGallery(editor, update);

        onShuffled(editor, element, { ...element, ...update });
    }

    return (
        <EditorBlock
            {...attributes}
            element={element}
            layout={withLayoutOptions ? element.layout : undefined}
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
