import type { UploadcareImage } from '@prezly/uploadcare';
import { isUploadcareImageSizeValid } from '@prezly/uploadcare';
import classNames from 'classnames';
import React from 'react';

import { ImageSizeWarning, ImageWithLoadingPlaceholder } from '#components';

import styles from './GalleryTile.module.scss';

interface Props {
    className?: string;
    image: UploadcareImage;
    url: string;
    width: number;
    height: number;
    margin: number;
    withBorderRadius: boolean;
}

export function GalleryTile({ className, image, url, width, height, margin, withBorderRadius }: Props) {
    return (
        <div
            className={classNames(styles.GalleryTile, className, {
                [styles.withBorderRadius]: withBorderRadius,
            })}
            style={{ width, height, margin }}
        >
            <ImageWithLoadingPlaceholder
                src={url}
                imageWidth={width}
                imageHeight={height}
                style={{
                    width: '100%',
                    height: '100%',
                }}
            />
            {!isUploadcareImageSizeValid(image) && (
                <ImageSizeWarning className={styles.SizeWarning} />
            )}
        </div>
    );
}
