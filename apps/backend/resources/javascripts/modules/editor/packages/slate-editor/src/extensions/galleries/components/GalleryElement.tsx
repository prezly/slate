import type { NewsroomRef } from '@prezly/sdk';
import type {
    GalleryImage,
    GalleryImageSize,
    GalleryLayout,
    GalleryNode,
    GalleryPadding,
} from '@prezly/slate-types';
import { awaitUploads, UPLOADCARE_FILE_DATA_KEY, UploadcareImage } from '@prezly/uploadcare';
import { noop } from '@technically/lodash';
import type { RenderElementProps, SlateEditor } from '@udecode/plate';
import { useEditorRef } from '@udecode/plate/react';
import React, { useState } from 'react';

import { EditorBlock } from '#components';
import { useLatest, useSize } from '#lib';

import type { MediaGalleryOptions } from '#modules/uploadcare';
import { UploadcareEditor } from '#modules/uploadcare';

import { shuffleImages } from '../lib';
import { removeGallery, updateGallery } from '../transforms';

import { Gallery } from './Gallery';
import { GalleryMenu } from './GalleryMenu';

interface Props extends RenderElementProps {
    availableWidth: number;
    element: GalleryNode;
    onAdd?: (editor: SlateEditor, gallery: GalleryNode) => void;
    onAdded?: (
        editor: SlateEditor,
        gallery: GalleryNode,
        extra: {
            successfulUploads: number;
            failedUploads: Error[];
        },
    ) => void;
    onImageCaptionClicked?: (editor: SlateEditor) => void;
    onImageCropClicked?: (editor: SlateEditor) => void;
    onImageDeleteClicked?: (editor: SlateEditor) => void;
    onLayoutChanged?: (editor: SlateEditor, layout: GalleryLayout) => void;
    onPaddingChanged?: (editor: SlateEditor, padding: GalleryPadding) => void;
    onReordered?: (editor: SlateEditor, gallery: GalleryNode) => void;
    onShuffled?: (editor: SlateEditor, updated: GalleryNode, original: GalleryNode) => void;
    onThumbnailSizeChanged?: (
        editor: SlateEditor,
        thumbnail_size: GalleryNode['thumbnail_size'],
    ) => void;
    withMediaGalleryTab: false | { enabled: boolean; newsroom: NewsroomRef };
    withLayoutOptions: boolean;
}

export function GalleryElement({
    availableWidth,
    attributes,
    children,
    element,
    onAdd = noop,
    onAdded = noop,
    onImageCaptionClicked = noop,
    onImageCropClicked = noop,
    onImageDeleteClicked = noop,
    onLayoutChanged = noop,
    onPaddingChanged = noop,
    onReordered = noop,
    onShuffled = noop,
    onThumbnailSizeChanged = noop,
    withMediaGalleryTab,
    withLayoutOptions,
}: Props) {
    const editor = useEditorRef();
    const [sizer, size] = useSize(Sizer, { width: availableWidth });
    const [isUploading, setUploading] = useState(false);
    const callbacks = useLatest({
        onAdd,
        onAdded,
        onImageCaptionClicked,
        onImageCropClicked,
        onImageDeleteClicked,
        onLayoutChanged,
        onPaddingChanged,
        onReordered,
        onShuffled,
        onThumbnailSizeChanged,
    });

    async function handleAdd() {
        callbacks.current.onAdd(editor, element);

        async function upload() {
            const filePromises = await UploadcareEditor.upload(editor, {
                ...withGalleryTabMaybe(withMediaGalleryTab),
                captions: true,
                imagesOnly: true,
                multiple: true,
            });

            if (!filePromises) {
                return undefined;
            }

            setUploading(true);
            try {
                return await awaitUploads(filePromises);
            } finally {
                setUploading(false);
            }
        }

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

        editor.tf.setNodes<GalleryNode>(
            { images: [...element.images, ...images] },
            { match: (node) => node === element },
        );

        callbacks.current.onAdded(editor, element, {
            successfulUploads: successfulUploads.length,
            failedUploads,
        });
    }

    function handleShuffle() {
        const update = {
            images: shuffleImages(element.images),
        };

        updateGallery(editor, update);

        callbacks.current.onShuffled(editor, element, { ...element, ...update });
    }

    function handleImagesChange(images: GalleryImage[]) {
        if (images.length === 0) {
            handleDelete();
            return;
        }

        updateGallery(editor, { images });
    }

    function handleImagesReordered(images: GalleryImage[]) {
        callbacks.current.onReordered(editor, { ...element, images });
    }

    function handleImageCaptionClicked() {
        callbacks.current.onImageCaptionClicked(editor);
    }

    function handleImageCropClicked() {
        callbacks.current.onImageCropClicked(editor);
    }

    function handleImageDeleteClicked() {
        callbacks.current.onImageDeleteClicked(editor);
    }

    function handleLayoutChange(layout: GalleryLayout) {
        updateGallery(editor, { layout });
        callbacks.current.onLayoutChanged(editor, layout);
    }

    function handlePaddingChange(padding: GalleryPadding) {
        updateGallery(editor, { padding });
        callbacks.current.onPaddingChanged(editor, padding);
    }

    function handleThumbnailSizeChange(thumbnail_size: GalleryImageSize) {
        updateGallery(editor, { thumbnail_size });
        callbacks.current.onThumbnailSizeChanged(editor, thumbnail_size);
    }

    function handleDelete() {
        removeGallery(editor);
    }

    return (
        <EditorBlock
            {...attributes}
            element={element}
            layout={withLayoutOptions ? element.layout : undefined}
            loading={isUploading}
            overflow="visible"
            // We have to render children or Slate will fail when trying to find the node.
            renderAboveFrame={children}
            renderReadOnlyFrame={({ isSelected }) => (
                <>
                    {sizer}
                    <Gallery
                        images={element.images}
                        isInteractive={isSelected}
                        onImageCaptionClicked={handleImageCaptionClicked}
                        onImageCropClicked={handleImageCropClicked}
                        onImageDeleteClicked={handleImageDeleteClicked}
                        onImagesChange={handleImagesChange}
                        onImagesReordered={handleImagesReordered}
                        padding={element.padding}
                        size={element.thumbnail_size}
                        uuid={element.uuid}
                        width={size.width}
                    />
                </>
            )}
            renderMenu={() => (
                <GalleryMenu
                    element={element}
                    onAdd={handleAdd}
                    onDelete={handleDelete}
                    onLayoutChange={handleLayoutChange}
                    onPaddingChange={handlePaddingChange}
                    onShuffle={handleShuffle}
                    onThumbnailSizeChange={handleThumbnailSizeChange}
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

function withGalleryTabMaybe(
    withMediaGalleryTab: Props['withMediaGalleryTab'],
): MediaGalleryOptions<true> | MediaGalleryOptions<false> {
    if (withMediaGalleryTab && withMediaGalleryTab.enabled) {
        return {
            mediaGalleryTab: true,
            newsroom: withMediaGalleryTab.newsroom,
        };
    }

    return {
        mediaGalleryTab: false,
    };
}
