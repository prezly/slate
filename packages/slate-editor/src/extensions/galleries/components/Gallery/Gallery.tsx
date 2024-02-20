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
import type { GalleryNode } from '@prezly/slate-types';
import type { UploadcareImage } from '@prezly/uploadcare';
import { isUploadcareImageSizeValid } from '@prezly/uploadcare';
import classNames from 'classnames';
import type { HTMLAttributes } from 'react';
import React, { useCallback, useMemo, useState } from 'react';

import { IMAGE_PADDING, IMAGE_SIZE } from './constants';
import styles from './Gallery.module.scss';
import { GalleryTile } from './GalleryTile';
import type { Layout } from './lib';
import { calculateLayout } from './lib';
import { SortableGalleryTile } from './SortableGalleryTile';

interface Props extends HTMLAttributes<HTMLDivElement> {
    className?: string;
    images: UploadcareImage[];
    isInteractive: boolean;
    padding: GalleryNode['padding'];
    size: GalleryNode['thumbnail_size'];
    width: number;
    maxViewportWidth?: number;
}

export function Gallery({
    className,
    images,
    isInteractive,
    maxViewportWidth = 800,
    padding,
    size,
    width,
    ...attributes
}: Props) {
    const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
    const [orderedImages, setOrderedImages] = useState(images);
    const ids = useMemo(() => orderedImages.map((image) => image.uuid), []);
    const activeIndex = activeId ? orderedImages.findIndex((image) => image.uuid === activeId) : -1;

    const sensors = useSensors(useSensor(PointerSensor));

    const margin = IMAGE_PADDING[padding];
    const idealHeight = IMAGE_SIZE[size] + 2 * margin;
    const calculatedLayout = calculateLayout({
        idealHeight,
        images: orderedImages,
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
            const overIndex = orderedImages.findIndex((image) => image.uuid === over.id);
            if (activeIndex !== overIndex) {
                setOrderedImages((images) => arrayMove(images, activeIndex, overIndex));
            }
        }

        setActiveId(null);
    }

    function handleDragCancel() {
        setActiveId(null);
    }

    const getIndex = useCallback((id: UniqueIdentifier) => {
        return orderedImages.findIndex((image) => image.uuid === id);
    }, []);

    return (
        <DndContext
            collisionDetection={closestCenter}
            onDragCancel={handleDragCancel}
            onDragEnd={handleDragEnd}
            onDragStart={handleDragStart}
            sensors={sensors}
        >
            <SortableContext disabled={!isInteractive} items={ids}>
                <div {...attributes} className={classNames(styles.Gallery, className)}>
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
                                        isInteractive={isInteractive}
                                        getIndex={getIndex}
                                        url={preview.cdnUrl}
                                        imageWidth={tile.width}
                                        imageHeight={tile.height}
                                        style={{
                                            width: `${((100 * tile.width) / width).toFixed(3)}%`,
                                        }}
                                        withBorderRadius={margin > 0}
                                        withSizeWarning={!isUploadcareImageSizeValid(tile.image)}
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
            url={preview.cdnUrl}
            imageWidth={tile.width}
            imageHeight={tile.height}
            style={{ transform: 'scale(0.4)' }}
            withBorderRadius={margin > 0}
            withSizeWarning={!isUploadcareImageSizeValid(tile.image)}
        />
    );
}
