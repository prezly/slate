import classNames from 'classnames';
import type { CSSProperties } from 'react';
import React, { forwardRef } from 'react';

import { ImageSizeWarning, ImageWithLoadingPlaceholder } from '#components';

import styles from './GalleryTile.module.scss';

export interface Props {
    active?: boolean;
    className?: string;
    dragging?: boolean;
    url: string;
    isInteractive?: boolean;
    imageWidth: number;
    imageHeight: number;
    insertPosition?: 'before' | 'after';
    style?: CSSProperties;
    withBorderRadius: boolean;
    withSizeWarning?: boolean;
}

export const GalleryTile = forwardRef<HTMLDivElement, Props>(function GalleryTile(
    {
        active = false,
        className,
        dragging,
        isInteractive,
        imageHeight,
        imageWidth,
        insertPosition,
        style = {},
        url,
        withBorderRadius,
        withSizeWarning = false,
        ...props
    },
    ref,
) {
    return (
        <div
            className={classNames(styles.GalleryTile, className, {
                [styles.withBorderRadius]: withBorderRadius,
                [styles.interactive]: isInteractive,
                [styles.dragging]: dragging,
                [styles.insertBefore]: insertPosition === 'before',
                [styles.insertAfter]: insertPosition === 'after',
            })}
            ref={ref}
            style={style}
            {...props}
        >
            {active && <div className={styles.Overlay} />}
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
});
