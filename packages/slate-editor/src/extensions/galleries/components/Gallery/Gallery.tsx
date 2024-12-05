import type { DragEndEvent, DragStartEvent, UniqueIdentifier } from '@dnd-kit/core';
import {
    closestCenter,
    DndContext,
    DragOverlay,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import { arrayMove, SortableContext } from '@dnd-kit/sortable';
import { GalleryImageSize, type GalleryImage, type GalleryNode } from '@prezly/slate-types';
import { awaitUploads, UploadcareImage } from '@prezly/uploadcare';
import { isUploadcareImageSizeValid } from '@prezly/uploadcare';
import { noop } from '@technically/lodash';
import { useEditorRef } from '@udecode/plate-common/react';
import type { HTMLAttributes } from 'react';
import React, { useMemo, useState } from 'react';
import { createPortal } from 'react-dom';

import { UploadcareEditor } from '#modules/uploadcare';

import { IMAGE_PADDING, IMAGE_SIZE } from './constants';
import styles from './Gallery.module.scss';
import { GalleryTile } from './GalleryTile';
import type { Tile } from './lib';
import { calculateLayout } from './lib';
import { SortableGalleryTile } from './SortableGalleryTile';

interface Props extends HTMLAttributes<HTMLDivElement> {
    className?: string;
    images: GalleryImage[];
    isInteractive: boolean;
    maxViewportWidth?: number;
    onImageCaptionClicked?: () => void;
    onImageCropClicked?: () => void;
    onImageDeleteClicked?: () => void;
    onImagesChange: (images: GalleryImage[]) => void;
    onImagesReordered: (images: GalleryImage[]) => void;
    padding: GalleryNode['padding'];
    size: GalleryNode['thumbnail_size'];
    uuid: string;
    width: number;
}

export function Gallery({
    className,
    images: originalImages,
    isInteractive,
    maxViewportWidth = 800,
    onImageCaptionClicked,
    onImageCropClicked,
    onImageDeleteClicked,
    onImagesChange,
    onImagesReordered,
    padding,
    size,
    uuid,
    width,
    ...attributes
}: Props) {
    const editor = useEditorRef();
    const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
    const images = useMemo(
        () =>
            originalImages.map((image, index) => ({ ...image, id: `${image.file.uuid}-${index}` })),
        [originalImages],
    );
    const ids = useMemo(() => images.map(({ id }) => id), [images]);
    const activeIndex = activeId ? images.findIndex(({ id }) => id === activeId) : -1;

    const sensors = useSensors(useSensor(PointerSensor));

    const margin = IMAGE_PADDING[padding];
    const idealHeight = IMAGE_SIZE[size] + 2 * margin;
    const calculatedLayout = calculateLayout({
        idealHeight,
        images: images.map((image) => UploadcareImage.createFromPrezlyStoragePayload(image.file)),
        viewportWidth: width,
        margin,
    });

    const activeTile: Tile<UploadcareImage> | undefined = calculatedLayout.flat()[activeIndex];

    function handleImagesChange(images: GalleryImage[]) {
        // Strip out the `id` property before passing the data along
        onImagesChange(images.map((image) => ({ caption: image.caption, file: image.file })));
    }

    function handleDragStart({ active }: DragStartEvent) {
        if (!active) {
            return;
        }

        setActiveId(active.id);
    }

    function handleDragEnd({ over }: DragEndEvent) {
        if (over) {
            const overIndex = images.findIndex((image) => image.id === over.id);
            if (activeIndex !== overIndex) {
                const newImages = arrayMove(images, activeIndex, overIndex);
                onImagesReordered(newImages);
                handleImagesChange(newImages);
            }
        }

        setActiveId(null);
    }

    function handleDragCancel() {
        setActiveId(null);
    }

    function handleCaptionChange(id: UniqueIdentifier, caption: string) {
        const newImages = images.map((image) => {
            if (image.id === id) {
                return {
                    ...image,
                    caption,
                };
            }

            return image;
        });

        handleImagesChange(newImages);
    }

    async function handleCrop(id: UniqueIdentifier) {
        const image = images.find((image) => image.id === id);
        if (!image) {
            return;
        }

        const uploadcareImage = UploadcareImage.createFromPrezlyStoragePayload(image.file);

        async function crop() {
            const filePromises = await UploadcareEditor.upload(editor, {
                files: [uploadcareImage],
                crop: true,
                imagesOnly: true,
                tabs: [],
            });

            if (!filePromises) {
                return undefined;
            }

            return await awaitUploads(filePromises);
        }

        const result = await crop();
        if (!result) {
            return;
        }

        const [croppedImage] = result.successfulUploads.map((fileInfo) => {
            const image = UploadcareImage.createFromUploadcareWidgetPayload(fileInfo);
            return image.toPrezlyStoragePayload();
        });

        const newImages = images.map((image) => {
            if (image.id === id) {
                return { ...image, file: croppedImage };
            }

            return image;
        });

        handleImagesChange(newImages);
    }

    function handleDelete(id: UniqueIdentifier) {
        const newImages = images.filter((image) => image.id !== id);
        handleImagesChange(newImages);
    }

    let tileIndex = 0;

    return (
        <DndContext
            collisionDetection={closestCenter}
            onDragCancel={handleDragCancel}
            onDragEnd={handleDragEnd}
            onDragStart={handleDragStart}
            sensors={sensors}
        >
            <SortableContext id={uuid} disabled={!isInteractive} items={ids}>
                <div {...attributes} className={className}>
                    {calculatedLayout.map((row, rowIndex) => (
                        <div
                            key={rowIndex}
                            className={styles.Row}
                            style={{ marginTop: rowIndex === 0 ? 0 : margin }}
                        >
                            {row.map((tile) => {
                                const preview = tile.image.resize(maxViewportWidth);
                                const { id, caption } = images[tileIndex];

                                tileIndex++;

                                return (
                                    <SortableGalleryTile
                                        key={id}
                                        id={id}
                                        caption={caption}
                                        isInteractive={isInteractive}
                                        url={preview.cdnUrl}
                                        imageWidth={tile.width}
                                        imageHeight={tile.height}
                                        onCaptionChange={(caption) =>
                                            handleCaptionChange(id, caption)
                                        }
                                        onCaptionClicked={onImageCaptionClicked}
                                        onCrop={() => handleCrop(id)}
                                        onCropClicked={onImageCropClicked}
                                        onDelete={() => handleDelete(id)}
                                        onDeleteClicked={onImageDeleteClicked}
                                        style={{
                                            width: `${((100 * tile.width) / width).toFixed(3)}%`,
                                        }}
                                        withBorderRadius={margin > 0}
                                        withSizeWarning={!isUploadcareImageSizeValid(tile.image)}
                                        withSmallButtons={size === GalleryImageSize.XS}
                                    />
                                );
                            })}
                        </div>
                    ))}
                </div>
            </SortableContext>
            {createPortal(
                <DragOverlay dropAnimation={null}>
                    {activeId ? (
                        <GalleryTileOverlay
                            margin={margin}
                            maxViewportWidth={maxViewportWidth}
                            tile={activeTile}
                        />
                    ) : null}
                </DragOverlay>,
                document.body,
            )}
        </DndContext>
    );
}

function GalleryTileOverlay({
    margin,
    maxViewportWidth,
    tile,
}: {
    margin: number;
    maxViewportWidth: number;
    tile: Tile<UploadcareImage>;
}) {
    if (!tile) {
        return null;
    }

    const preview = tile.image.resize(maxViewportWidth);

    return (
        <GalleryTile
            dragging
            imageHeight={tile.height}
            imageWidth={tile.width}
            onCaptionChange={noop}
            onCrop={noop}
            onDelete={noop}
            url={preview.cdnUrl}
            withBorderRadius={margin > 0}
            withSizeWarning={!isUploadcareImageSizeValid(tile.image)}
        />
    );
}
