import classNames from 'classnames';
import type { CSSProperties } from 'react';
import React from 'react';

import { ImageSizeWarning, ImageWithLoadingPlaceholder } from '#components';

import styles from './GalleryTile.module.scss';

interface Props {
    className?: string;
    url: string;
    imageWidth: number;
    imageHeight: number;
    style?: CSSProperties;
    withBorderRadius: boolean;
    withSizeWarning?: boolean;
}

export function GalleryTile({
    className,
    url,
    imageWidth,
    imageHeight,
    style = {},
    withBorderRadius,
    withSizeWarning = false,
}: Props) {
    return (
        <div
            className={classNames(styles.GalleryTile, className, {
                [styles.withBorderRadius]: withBorderRadius,
            })}
            style={style}
        >
            <ImageWithLoadingPlaceholder
                src={url}
                imageWidth={imageWidth}
                imageHeight={imageHeight}
                style={{
                    width: '100%',
                    height: '100%',
                }}
            />
            {withSizeWarning && <ImageSizeWarning className={styles.SizeWarning} />}
        </div>
    );
}
