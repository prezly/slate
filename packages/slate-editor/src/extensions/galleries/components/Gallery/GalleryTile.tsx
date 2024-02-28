import classNames from 'classnames';
import type { CSSProperties, ChangeEvent } from 'react';
import React, { forwardRef, useEffect, useState } from 'react';

import { Button, ImageSizeWarning, ImageWithLoadingPlaceholder, TooltipV2 } from '#components';
import { Crop, Delete, Edit } from '#icons';

import styles from './GalleryTile.module.scss';

export interface Props {
    caption?: string;
    className?: string;
    clone?: boolean;
    dragging?: boolean;
    imageHeight: number;
    imageWidth: number;
    isInteractive?: boolean;
    onCaptionChange: (caption: string) => void;
    onCrop: () => void;
    onDelete: () => void;
    style?: CSSProperties;
    url: string;
    withBorderRadius: boolean;
    withDropOverlay?: boolean;
    withSizeWarning?: boolean;
    withSmallButtons?: boolean;
}

export const GalleryTile = forwardRef<HTMLDivElement, Props>(function GalleryTile(
    {
        caption: originalCaption,
        className,
        clone = false,
        dragging,
        imageHeight,
        imageWidth,
        isInteractive,
        onCaptionChange,
        onCrop,
        onDelete,
        style = {},
        url,
        withBorderRadius,
        withDropOverlay = false,
        withSizeWarning = false,
        withSmallButtons = false,
        ...props
    },
    ref,
) {
    // We have to use an intermediate state otherwise the input keeps
    // re-rendering every time the original caption changes and moves
    // the caret to the end of the input
    const [caption, setCaption] = useState(originalCaption);
    const [isHovering, setHovering] = useState(false);
    const [isEditingCaption, setEditingCaption] = useState(false);

    function handleCaptionChange(event: ChangeEvent<HTMLInputElement>) {
        const text = event.currentTarget.value;
        setCaption(text);
        onCaptionChange(text);
    }

    function handleShowOverlay() {
        setTimeout(() => setHovering(true), 0);
    }

    function handleHideOverlay() {
        setHovering(false);
    }

    useEffect(() => {
        setCaption(caption);
    }, [caption]);

    return (
        <div
            className={classNames(styles.GalleryTile, className, {
                [styles.withBorderRadius]: withBorderRadius,
                [styles.interactive]: isInteractive,
                [styles.dragging]: dragging,
                [styles.withDropOverlay]: withDropOverlay,
            })}
            ref={ref}
            style={style}
        >
            {clone && <div className={styles.Clone} />}
            {!dragging && (
                <div
                    className={classNames(styles.Overlay, {
                        [styles.isHovering]: isHovering,
                    })}
                    onMouseEnter={handleShowOverlay}
                    onMouseLeave={handleHideOverlay}
                >
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
                        {isEditingCaption ? (
                            <input
                                autoFocus
                                type="text"
                                className={styles.Input}
                                onChange={handleCaptionChange}
                                onBlur={() => setEditingCaption(false)}
                                value={caption}
                                placeholder="add caption"
                            />
                        ) : (
                            <Button
                                className={classNames(styles.Button, {
                                    [styles.empty]: !caption,
                                })}
                                icon={isInteractive ? Edit : undefined}
                                iconPosition="right"
                                onClick={() => setEditingCaption(true)}
                                variant="clear"
                            >
                                {caption || 'add caption'}
                            </Button>
                        )}
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
        <TooltipV2.Tooltip tooltip="Crop image">
            {({ ariaAttributes, onHide, onShow, setReferenceElement }) => (
                <span onMouseEnter={onShow} onMouseLeave={onHide} ref={setReferenceElement}>
                    <Button
                        {...ariaAttributes}
                        className={classNames(styles.Button, {
                            [styles.small]: props.isSmall,
                        })}
                        round
                        variant="secondary"
                        icon={Crop}
                        onClick={props.onCrop}
                    />
                </span>
            )}
        </TooltipV2.Tooltip>
    );
}

function DeleteButton(props: { isSmall?: boolean; onDelete: () => void }) {
    return (
        <TooltipV2.Tooltip tooltip="Delete image">
            {({ ariaAttributes, onHide, onShow, setReferenceElement }) => (
                <span onMouseEnter={onShow} onMouseLeave={onHide} ref={setReferenceElement}>
                    <Button
                        {...ariaAttributes}
                        className={classNames(styles.Button, styles.danger, {
                            [styles.small]: props.isSmall,
                        })}
                        round
                        variant="secondary"
                        icon={Delete}
                        onClick={props.onDelete}
                    />
                </span>
            )}
        </TooltipV2.Tooltip>
    );
}
