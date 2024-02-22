import { GalleryPadding } from '@prezly/slate-types';
import classNames from 'classnames';
import type { CSSProperties } from 'react';
import React, { forwardRef } from 'react';

import { Button, ImageSizeWarning, ImageWithLoadingPlaceholder } from '#components';
import { Crop, Delete } from '#icons';

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
    onCaptionChange: (caption: string) => void;
    onCrop: () => void;
    onDelete: () => void;
    padding?: GalleryPadding;
    style?: CSSProperties;
    url: string;
    withBorderRadius: boolean;
    withSizeWarning?: boolean;
    withSmallButtons?: boolean;
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
        onCrop,
        onDelete,
        padding,
        style = {},
        url,
        withBorderRadius,
        withSizeWarning = false,
        withSmallButtons = false,
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
                [styles.withMediumPadding]: padding === GalleryPadding.M,
                [styles.withLargePadding]: padding === GalleryPadding.L,
            })}
            ref={ref}
            style={style}
        >
            {clone && <div className={styles.Clone} />}
            {!dragging && (
                <div className={styles.Overlay}>
                    <div className={styles.Actions}>
                        <CropButton isSmall={withSmallButtons} onCrop={onCrop} />
                        <DeleteButton isSmall={withSmallButtons} onDelete={onDelete} />
                    </div>
                    <div className={styles.DragHandle} {...props} tabIndex={-1} />
                    <div
                        className={classNames(styles.Caption, {
                            [styles.visible]: caption !== '',
                        })}
                    >
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

function CropButton(props: { isSmall?: boolean; onCrop: () => void }) {
    return (
        <Button
            className={classNames(styles.Button, {
                [styles.small]: props.isSmall,
            })}
            round
            variant="secondary"
            icon={Crop}
            onClick={props.onCrop}
        />
    );
}

function DeleteButton(props: { isSmall?: boolean; onDelete: () => void }) {
    return (
        <Button
            className={classNames(styles.Button, styles.danger, {
                [styles.small]: props.isSmall,
            })}
            round
            variant="secondary"
            icon={Delete}
            onClick={props.onDelete}
        />
    );
}
