import classNames from 'classnames';
import React from 'react';

import { ImageSizeWarning, ImageWithLoadingPlaceholder } from '#components';

import styles from './GalleryTile.module.scss';

interface Props {
    className?: string;
    url: string;
    width: number;
    height: number;
    margin: number;
    withBorderRadius: boolean;
    withSizeWarning?: boolean;
}

export function GalleryTile({
    className,
    url,
    width,
    height,
    margin,
    withBorderRadius,
    withSizeWarning = false,
}: Props) {
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
            {withSizeWarning && <ImageSizeWarning className={styles.SizeWarning} />}
        </div>
    );
}
