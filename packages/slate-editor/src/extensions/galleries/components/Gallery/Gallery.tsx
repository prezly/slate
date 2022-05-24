import type { GalleryNode } from '@prezly/slate-types';
import type { UploadcareImage } from '@prezly/uploadcare';
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

export function Gallery(props: Props) {
    const { className, images, maxViewportWidth = 800, padding, size, width, ...attributes } = props;
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
            <div style={{ margin: -margin }}>
                {calculatedLayout.map((row, index) => (
                    <div className={styles.Row} key={index}>
                        {row.map(({ width, height, image }) => {
                            const preview = image.resize(maxViewportWidth);

                            return (
                                <GalleryTile
                                    key={image.uuid}
                                    image={image}
                                    url={preview.cdnUrl}
                                    width={width}
                                    height={height}
                                    margin={margin}
                                    withBorderRadius={margin > 0}
                                />
                            );
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
}
