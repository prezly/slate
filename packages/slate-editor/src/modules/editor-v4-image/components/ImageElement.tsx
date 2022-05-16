import { EditorCommands } from '@prezly/slate-commons';
import type { ImageNode, ImageWidth } from '@prezly/slate-types';
import { Alignment, ImageLayout } from '@prezly/slate-types';
import { UploadcareImage } from '@prezly/uploadcare';
import classNames from 'classnames';
import React, { useCallback, useMemo } from 'react';
import { Editor } from 'slate';
import type { RenderElementProps } from 'slate-react';
import { useSelected, useSlateStatic } from 'slate-react';

import { ResizableEditorBlock } from '#components';

import { removeImage, updateImage } from '../transforms';

import { Image } from './Image';
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

    const handleResize = useCallback(
        function (width: ImageNode['width']) {
            updateImage(editor, { width });
        },
        [editor],
    );

    const handleCrop = useCallback(() => onCrop(editor, element), [editor, element]);
    const handleRemove = useCallback(
        function () {
            const removedElement = removeImage(editor);
            if (removedElement) onRemove(editor, removedElement);
        },
        [editor, element],
    );
    const handleReplace = useCallback(() => onReplace(editor, element), [editor, element]);
    const handleUpdate = useCallback(
        function (patch: Partial<FormState>) {
            const { size, ...rest } = patch;
            if (size !== undefined) {
                updateImage(editor, { ...rest, width: fromSizeOption(element, size) });
                return;
            }
            updateImage(editor, patch);
        },
        [editor, element],
    );

    const image = UploadcareImage.createFromPrezlyStoragePayload(element.file).preview();
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
            overlay="always"
            renderBlock={() => <Image className={styles.image} image={image} />}
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
                    className={classNames(styles.caption, {
                        [styles.floating]: isCaptionEmpty,
                        [styles.visible]: isCaptionVisible,
                        [styles.alignLeft]: align === Alignment.LEFT,
                        [styles.alignCenter]: align === Alignment.CENTER,
                        [styles.alignRight]: align === Alignment.RIGHT,
                    })}
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
