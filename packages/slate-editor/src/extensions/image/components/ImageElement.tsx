import { EditorCommands } from '@prezly/slate-commons';
import type { ImageNode, ImageWidth } from '@prezly/slate-types';
import { Alignment, ImageLayout } from '@prezly/slate-types';
import { UploadcareImage } from '@prezly/uploadcare';
import classNames from 'classnames';
import React, { useCallback, useMemo } from 'react';
import { Editor } from 'slate';
import type { RenderElementProps } from 'slate-react';
import { useSelected, useSlateStatic } from 'slate-react';

import { ImageWithLoadingPlaceholder, ResizableEditorBlock } from '#components';
import { Image } from '#icons';

import { removeImage, updateImage } from '../transforms';

import styles from './ImageElement.module.scss';
import type { FormState } from './ImageMenu';
import { ImageMenu, Size } from './ImageMenu';

interface Props extends RenderElementProps {
    element: ImageNode;
    onCrop: (editor: Editor, element: ImageNode) => void;
    onReplace: (editor: Editor, element: ImageNode) => void;
    onRemove: (editor: Editor, element: ImageNode) => void;
    withAlignmentOptions: boolean;
    withSizeOptions: boolean;
    withLayoutOptions: boolean;
    withNewTabOption: boolean;
}

// Image can be of any size, which can increase loading time.
// 2 seconds seems like a reasonable average.
const ESTIMATED_LOADING_DURATION = 2000;

export function ImageElement({
    attributes,
    children,
    element,
    onCrop,
    onReplace,
    onRemove,
    withAlignmentOptions,
    withSizeOptions,
    withLayoutOptions,
    withNewTabOption,
}: Props) {
    const editor = useSlateStatic();
    const isSelected = useSelected();
    const isVoid = Editor.isVoid(editor, element);
    const isSupportingCaptions = !isVoid;
    const isCaptionEmpty = EditorCommands.isNodeEmpty(editor, element, true);
    const isCaptionVisible = isSupportingCaptions && (isSelected || !isCaptionEmpty);
    const isCaptionPlaceholderVisible = isSupportingCaptions && isCaptionEmpty && isSelected;

    const handleResize = useCallback(
        function (width: ImageNode['width']) {
            updateImage(editor, element, { width });
        },
        [editor, element],
    );

    const handleCrop = useCallback(() => onCrop(editor, element), [editor, element]);
    const handleRemove = useCallback(
        function () {
            const removedElement = removeImage(editor, element);
            if (removedElement) onRemove(editor, removedElement);
        },
        [editor, element],
    );
    const handleReplace = useCallback(() => onReplace(editor, element), [editor, element]);
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
            renderBlock={() => (
                <ImageWithLoadingPlaceholder
                    src={image.isGif() ? image.cdnUrl : image.format().cdnUrl}
                    imageWidth={width}
                    imageHeight={height}
                    icon={Image}
                    description="Loading Image"
                    estimatedDuration={ESTIMATED_LOADING_DURATION}
                />
            )}
            renderMenu={({ onClose }) => (
                <ImageMenu
                    onChange={handleUpdate}
                    onClose={onClose}
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
        >
            {isSupportingCaptions ? (
                <div
                    className={classNames(styles.Caption, {
                        [styles.empty]: isCaptionEmpty,
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
            ) : (
                children
            )}
        </ResizableEditorBlock>
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
