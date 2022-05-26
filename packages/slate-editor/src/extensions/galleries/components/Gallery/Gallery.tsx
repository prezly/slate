import type { GalleryNode } from '@prezly/slate-types';
import type { UploadcareImage } from '@prezly/uploadcare';
import { isUploadcareImageSizeValid } from '@prezly/uploadcare';
import classNames from 'classnames';
import type { HTMLAttributes } from 'react';
import React from 'react';

import { IMAGE_PADDING, IMAGE_SIZE } from './constants';
import styles from './Gallery.module.scss';
import { GalleryTile } from './GalleryTile';
import { calculateLayout } from './lib';

interface Props extends HTMLAttributes<HTMLDivElement> {
    className?: string;
    images: UploadcareImage[];
    padding: GalleryNode['padding'];
    size: GalleryNode['thumbnail_size'];
    width: number;
    maxViewportWidth?: number;
}

export function Gallery({
    className,
    images,
    maxViewportWidth = 800,
    padding,
    size,
    width,
    ...attributes
}: Props) {
    const margin = IMAGE_PADDING[padding];
    const idealHeight = IMAGE_SIZE[size] + 2 * margin;
    const calculatedLayout = calculateLayout({
        idealHeight,
        images,
        viewportWidth: width,
        margin,
    });

    return (
        <div {...attributes} className={classNames(styles.Gallery, className)}>
            {calculatedLayout.map((row, index) => (
                <div
                    key={index}
                    className={styles.Row}
                    style={{ marginTop: index === 0 ? 0 : margin }}
                >
                    {row.map((tile) => {
                        const preview = tile.image.resize(maxViewportWidth);

                        return (
                            <GalleryTile
                                key={tile.image.uuid}
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
    );
}
