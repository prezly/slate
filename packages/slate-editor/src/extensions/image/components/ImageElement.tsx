import type { NewsroomRef } from '@prezly/sdk';
import { EditorCommands } from '@prezly/slate-commons';
import type { ImageNode, ImageWidth } from '@prezly/slate-types';
import { Alignment, ImageLayout } from '@prezly/slate-types';
import type { PrezlyFileInfo } from '@prezly/uploadcare';
import { toProgressPromise, UploadcareImage } from '@prezly/uploadcare';
import type { SlateEditor } from '@udecode/plate-common';
import { useEditorRef } from '@udecode/plate-common/react';
import classNames from 'classnames';
import React, { useCallback, useMemo } from 'react';
import type { RenderElementProps } from 'slate-react';
import { useSelected } from 'slate-react';

import { ImageWithLoadingPlaceholder, ResizableEditorBlock } from '#components';
import { Image } from '#icons';
import { useLatest } from '#lib';

import { createPlaceholder, PlaceholderNode, PlaceholdersManager } from '#extensions/placeholders';
import type { MediaGalleryOptions } from '#modules/uploadcare';
import { UploadcareEditor } from '#modules/uploadcare';

import { removeImage, updateImage } from '../transforms';

import styles from './ImageElement.module.scss';
import type { FormState } from './ImageMenu';
import { ImageMenu, Size } from './ImageMenu';

interface Props extends RenderElementProps {
    element: ImageNode;
    onCrop: (editor: SlateEditor, original: ImageNode) => void;
    onCropped: (editor: SlateEditor, updated: ImageNode) => void;
    onReplace: (editor: SlateEditor, element: ImageNode) => void;
    onReplaced: (editor: SlateEditor, element: ImageNode) => void;
    onRemoved: (editor: SlateEditor, element: ImageNode) => void;
    withAlignmentOptions: boolean;
    withCaptions: boolean;
    withLayoutOptions: boolean;
    withMediaGalleryTab: false | { enabled: boolean; newsroom: NewsroomRef };
    withNewTabOption: boolean;
    withSizeOptions: boolean;
}

// Image can be of any size, which can increase loading time.
// 2 seconds seems like a reasonable average.
const ESTIMATED_LOADING_DURATION = 2000;

export function ImageElement({
    attributes,
    children,
    element,
    onCrop,
    onCropped,
    onRemoved,
    onReplace,
    onReplaced,
    withAlignmentOptions,
    withCaptions,
    withLayoutOptions,
    withMediaGalleryTab,
    withNewTabOption,
    withSizeOptions,
}: Props) {
    const editor = useEditorRef();
    const isSelected = useSelected();
    // @ts-expect-error TODO: Fix this
    const isVoid = editor.isVoid(element);
    const isSupportingCaptions = !isVoid;
    const isCaptionEmpty = EditorCommands.isNodeEmpty(editor, element, true);
    const isCaptionVisible = isSupportingCaptions && (isSelected || !isCaptionEmpty);
    const isCaptionPlaceholderVisible = isSupportingCaptions && isCaptionEmpty && isSelected;

    const callbacks = useLatest({ onCrop, onCropped, onReplace, onReplaced, onRemoved });

    const handleResize = useCallback(
        function (width: ImageNode['width']) {
            updateImage(editor, element, { width });
        },
        [editor, element],
    );

    const handleCrop = useCallback(async () => {
        callbacks.current.onCrop(editor, element);

        const initialFileInfo = UploadcareImage.createFromPrezlyStoragePayload(element.file);

        const [upload] =
            (await UploadcareEditor.upload(editor, {
                ...withGalleryTabMaybe(withMediaGalleryTab),
                captions: withCaptions,
                files: [initialFileInfo],
                imagesOnly: true,
                multiple: false,
                tabs: [],
            })) ?? [];

        if (!upload) {
            return;
        }

        const placeholder = createPlaceholder({ type: PlaceholderNode.Type.IMAGE });

        const uploading = toProgressPromise(upload).then((fileInfo: PrezlyFileInfo) => {
            const image = UploadcareImage.createFromUploadcareWidgetPayload(fileInfo);

            callbacks.current.onCropped(editor, element);

            return {
                image: {
                    ...element,
                    file: image.toPrezlyStoragePayload(),
                },
                operation: 'crop' as const,
                trigger: 'image-menu' as const,
            };
        });

        PlaceholdersManager.register(placeholder.type, placeholder.uuid, uploading);

        const path = EditorCommands.getNodePath(editor, {
            match: (node) => node === element,
        });

        if (path) {
            editor.withoutNormalizing(() => {
                // Remove image caption nodes, as placeholders are voids and cannot have children.
                // We have to do this, as Slate automatically unwraps void node children, if any.
                // This converts image captions to sibling paragraphs image editing operations.
                EditorCommands.removeChildren(editor, [element, path]);

                editor.setNodes(placeholder, { at: path, voids: true });
            });
        }
    }, [editor, element]);
    const handleRemove = useCallback(
        function () {
            const removedElement = removeImage(editor, element);
            if (removedElement) {
                callbacks.current.onRemoved(editor, removedElement);
            }
        },
        [editor, element],
    );
    const handleReplace = useCallback(async () => {
        callbacks.current.onReplace(editor, element);

        const [upload] =
            (await UploadcareEditor.upload(editor, {
                ...withGalleryTabMaybe(withMediaGalleryTab),
                captions: withCaptions,
                imagesOnly: true,
                multiple: false,
            })) ?? [];

        if (!upload) {
            return;
        }

        const placeholder = createPlaceholder({ type: PlaceholderNode.Type.IMAGE });

        const uploading = toProgressPromise(upload).then((fileInfo: PrezlyFileInfo) => {
            const image = UploadcareImage.createFromUploadcareWidgetPayload(fileInfo);
            const updated = {
                ...element,
                file: image.toPrezlyStoragePayload(),
            };

            callbacks.current.onReplaced(editor, updated);

            return {
                image: updated,
                operation: 'replace' as const,
                trigger: 'image-menu' as const,
            };
        });

        PlaceholdersManager.register(placeholder.type, placeholder.uuid, uploading);

        const path = EditorCommands.getNodePath(editor, {
            match: (node) => node === element,
        });

        if (path) {
            editor.withoutNormalizing(() => {
                // Remove image caption nodes, as placeholders are voids and cannot have children.
                // We have to do this, as Slate automatically unwraps void node children, if any.
                // This converts image captions to sibling paragraphs image editing operations.
                EditorCommands.removeChildren(editor, [element, path]);

                editor.setNodes(placeholder, { at: path, voids: true });
            });
        }
    }, [editor, element]);

    const handleUpdate = useCallback(
        function (patch: Partial<FormState>) {
            const { size, ...rest } = patch;
            if (size !== undefined) {
                updateImage(editor, element, { ...rest, width: fromSizeOption(element, size) });
                return;
            }
            updateImage(editor, element, patch);
        },
        [editor, element],
    );

    const image = UploadcareImage.createFromPrezlyStoragePayload(element.file).preview();
    const { width, height } = image.dimensions;
    const layout = withLayoutOptions
        ? element.layout ?? ImageLayout.CONTAINED
        : ImageLayout.CONTAINED;
    const isResizable = layout === ImageLayout.CONTAINED;
    const align = withAlignmentOptions && isResizable ? element.align : Alignment.CENTER;
    const sizeOptions = useMemo(
        function () {
            if (!withSizeOptions) return false;
            const width = UploadcareImage.createFromPrezlyStoragePayload(element.file).width;

            if (width < 300) return [Size.ORIGINAL];
            if (width < 720) return [Size.SMALL, Size.ORIGINAL];

            return [Size.SMALL, Size.BEST_FIT, Size.ORIGINAL];
        },
        [withSizeOptions, element.file],
    );

    return (
        <ResizableEditorBlock
            {...attributes}
            align={align}
            element={element}
            layout={layout}
            onResize={handleResize}
            overlay={false}
            renderAboveFrame={isSupportingCaptions ? undefined : children}
            renderBelowFrame={
                isSupportingCaptions && (
                    <div
                        className={classNames(styles.Caption, {
                            [styles.empty]: isCaptionEmpty && !isCaptionPlaceholderVisible,
                            [styles.withPlaceholder]: isCaptionPlaceholderVisible,
                            [styles.visible]: isCaptionVisible,
                            [styles.alignLeft]: align === Alignment.LEFT,
                            [styles.alignCenter]: align === Alignment.CENTER,
                            [styles.alignRight]: align === Alignment.RIGHT,
                        })}
                        data-placeholder="Image caption"
                    >
                        {children}
                    </div>
                )
            }
            renderReadOnlyFrame={() => (
                <ImageWithLoadingPlaceholder
                    src={image.isGif() ? image.cdnUrl : image.format().cdnUrl}
                    imageWidth={width}
                    imageHeight={height}
                    icon={Image}
                    description="Loading Image"
                    estimatedDuration={ESTIMATED_LOADING_DURATION}
                />
            )}
            renderMenu={() => (
                <ImageMenu
                    onChange={handleUpdate}
                    onCrop={handleCrop}
                    onRemove={handleRemove}
                    onReplace={handleReplace}
                    value={{
                        align: element.align,
                        layout,
                        href: element.href,
                        new_tab: element.new_tab,
                        size: toSizeOption(element),
                    }}
                    withAlignmentOptions={withAlignmentOptions}
                    withSizeOptions={sizeOptions}
                    withLayoutOptions={withLayoutOptions}
                    withNewTabOption={withNewTabOption}
                />
            )}
            resizable={isResizable}
            rounded
            void={isVoid}
            width={isResizable ? element.width : '100%'}
            minWidth="100px"
            maxWidth={`${image.width}px`}
        />
    );
}

function fromSizeOption(image: ImageNode, size: Size): ImageWidth {
    if (size === Size.SMALL) {
        return '300px';
    }
    if (size === Size.BEST_FIT) {
        return '720px';
    }
    return `${UploadcareImage.createFromPrezlyStoragePayload(image.file).width}px`;
}

function toSizeOption(image: ImageNode): Size | undefined {
    if (image.width === '300px') {
        return Size.SMALL;
    }
    if (image.width === '720px') {
        return Size.BEST_FIT;
    }
    if (image.width === `${UploadcareImage.createFromPrezlyStoragePayload(image.file).width}px`) {
        return Size.ORIGINAL;
    }
    return undefined;
}

function withGalleryTabMaybe(
    withMediaGalleryTab: Props['withMediaGalleryTab'],
): MediaGalleryOptions<true> | MediaGalleryOptions<false> {
    if (withMediaGalleryTab && withMediaGalleryTab.enabled) {
        return {
            mediaGalleryTab: true,
            newsroom: withMediaGalleryTab.newsroom,
        };
    }

    return {
        mediaGalleryTab: false,
    };
}
