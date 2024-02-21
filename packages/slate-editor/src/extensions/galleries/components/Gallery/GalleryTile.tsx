import classNames from 'classnames';
import type { CSSProperties } from 'react';
import React, { forwardRef } from 'react';

import { ImageSizeWarning, ImageWithLoadingPlaceholder } from '#components';

import styles from './GalleryTile.module.scss';

export interface Props {
    caption?: string;
    className?: string;
    clone?: boolean;
    dragging?: boolean;
    imageHeight: number;
    imageWidth: number;
    insertPosition?: 'before' | 'after';
    isInteractive?: boolean;
    onCaptionChange?: (caption: string) => void;
    style?: CSSProperties;
    url: string;
    withBorderRadius: boolean;
    withSizeWarning?: boolean;
}

export const GalleryTile = forwardRef<HTMLDivElement, Props>(function GalleryTile(
    {
        caption,
        className,
        clone = false,
        dragging,
        imageHeight,
        imageWidth,
        insertPosition,
        isInteractive,
        onCaptionChange,
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
        >
            {clone && <div className={styles.Clone} />}
            {!dragging && (
                <div className={styles.Overlay}>
                    <div className={styles.DragHandle} {...props} />
                    <div className={styles.Caption}>
                        <input
                            type="text"
                            className={styles.Input}
                            onChange={(event) => onCaptionChange?.(event.currentTarget.value)}
                            value={caption}
                            placeholder={isInteractive ? 'add caption' : ''}
                        />
                    </div>
                </div>
            )}
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
