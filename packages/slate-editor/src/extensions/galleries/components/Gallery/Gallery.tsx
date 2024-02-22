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
import type { HTMLAttributes } from 'react';
import React, { useCallback, useMemo, useState } from 'react';
import { useSlateStatic } from 'slate-react';

import { UploadcareEditor } from '#modules/uploadcare';

import { IMAGE_PADDING, IMAGE_SIZE } from './constants';
import styles from './Gallery.module.scss';
import { GalleryTile } from './GalleryTile';
import type { Layout } from './lib';
import { calculateLayout } from './lib';
import { SortableGalleryTile } from './SortableGalleryTile';

interface Props extends HTMLAttributes<HTMLDivElement> {
    className?: string;
    images: GalleryImage[];
    isInteractive: boolean;
    maxViewportWidth?: number;
    onImagesChange: (images: GalleryImage[]) => void;
    padding: GalleryNode['padding'];
    size: GalleryNode['thumbnail_size'];
    uuid: string;
    width: number;
}

export function Gallery({
    className,
    images,
    isInteractive,
    maxViewportWidth = 800,
    onImagesChange,
    padding,
    size,
    uuid,
    width,
    ...attributes
}: Props) {
    const editor = useSlateStatic();
    const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
    const ids = useMemo(() => images.map((image) => image.file.uuid), [images]);
    const activeIndex = activeId ? images.findIndex((image) => image.file.uuid === activeId) : -1;

    const sensors = useSensors(useSensor(PointerSensor));

    const margin = IMAGE_PADDING[padding];
    const idealHeight = IMAGE_SIZE[size] + 2 * margin;
    const calculatedLayout = calculateLayout({
        idealHeight,
        images: images.map((image) => UploadcareImage.createFromPrezlyStoragePayload(image.file)),
        viewportWidth: width,
        margin,
    });

    function handleDragStart({ active }: DragStartEvent) {
        if (!active) {
            return;
        }

        setActiveId(active.id);
    }

    function handleDragEnd({ over }: DragEndEvent) {
        if (over) {
            const overIndex = images.findIndex((image) => image.file.uuid === over.id);
            if (activeIndex !== overIndex) {
                const newImages = arrayMove(images, activeIndex, overIndex);
                onImagesChange(newImages);
            }
        }

        setActiveId(null);
    }

    function handleDragCancel() {
        setActiveId(null);
    }

    function handleCaptionChange(uuid: string, caption: string) {
        const newImages = images.map((image) => {
            if (image.file.uuid === uuid) {
                return {
                    ...image,
                    caption,
                };
            }

            return image;
        });

        onImagesChange(newImages);
    }

    async function handleCrop(uuid: string) {
        const image = images.find((image) => image.file.uuid === uuid);
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
            if (image.file.uuid === uuid) {
                return { ...image, file: croppedImage };
            }

            return image;
        });

        onImagesChange(newImages);
    }

    function handleDelete(uuid: string) {
        const newImages = images.filter((image) => image.file.uuid !== uuid);
        onImagesChange(newImages);
    }

    const getCaption = useCallback(
        (uuid: string) => {
            const image = images.find((image) => image.file.uuid === uuid);
            return image?.caption ?? '';
        },
        [images],
    );

    const getIndex = useCallback(
        (id: UniqueIdentifier) => {
            return images.findIndex((image) => image.file.uuid === id);
        },
        [images],
    );

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

                                return (
                                    <SortableGalleryTile
                                        key={tile.image.uuid}
                                        id={tile.image.uuid}
                                        caption={getCaption(tile.image.uuid)}
                                        isInteractive={isInteractive}
                                        getIndex={getIndex}
                                        url={preview.cdnUrl}
                                        imageWidth={tile.width}
                                        imageHeight={tile.height}
                                        onCaptionChange={(caption) =>
                                            handleCaptionChange(tile.image.uuid, caption)
                                        }
                                        onCrop={() => handleCrop(tile.image.uuid)}
                                        onDelete={() => handleDelete(tile.image.uuid)}
                                        padding={padding}
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
            <DragOverlay dropAnimation={null}>
                {activeId ? (
                    <GalleryTileOverlay
                        id={activeId}
                        layout={calculatedLayout}
                        margin={margin}
                        maxViewportWidth={maxViewportWidth}
                    />
                ) : null}
            </DragOverlay>
        </DndContext>
    );
}

function GalleryTileOverlay({
    id,
    layout,
    margin,
    maxViewportWidth,
}: {
    id: UniqueIdentifier;
    layout: Layout<UploadcareImage>;
    margin: number;
    maxViewportWidth: number;
}) {
    const flatLayout = layout.flat();
    const tile = flatLayout.find(({ image }) => image.uuid === id);

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
            style={{ transform: 'scale(0.4)' }}
            url={preview.cdnUrl}
            withBorderRadius={margin > 0}
            withSizeWarning={!isUploadcareImageSizeValid(tile.image)}
        />
    );
}
