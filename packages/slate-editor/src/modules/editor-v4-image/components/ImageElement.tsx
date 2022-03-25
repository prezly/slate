import { EditorCommands } from '@prezly/slate-commons';
import type { ImageNode } from '@prezly/slate-types';
import { ImageLayout } from '@prezly/slate-types';
import { UploadcareImage } from '@prezly/uploadcare';
import classNames from 'classnames';
import type { FunctionComponent, RefObject } from 'react';
import React, { useCallback, useMemo } from 'react';
import { Editor } from 'slate';
import type { RenderElementProps } from 'slate-react';
import { useSelected, useSlateStatic } from 'slate-react';

import { ResizableEditorBlock } from '#components';
import { Size } from '#lib';

import { removeImage, updateImage } from '../transforms';

import { Image } from './Image';
import styles from './ImageElement.module.scss';
import { ImageMenu } from './ImageMenu';

interface Props extends RenderElementProps {
    availableWidth: number;
    containerRef: RefObject<HTMLElement>;
    element: ImageNode;
    onCrop: (editor: Editor, element: ImageNode) => void;
    onReplace: (editor: Editor, element: ImageNode) => void;
    onRemove: (editor: Editor, element: ImageNode) => void;
    showLayoutControls: boolean;
}

const HUNDRED_PIXELS = Size.fromPixels(100);
const HUNDRED_PERCENT = Size.fromPercents(100);

export const ImageElement: FunctionComponent<Props> = ({
    attributes,
    availableWidth,
    children,
    // containerRef,
    element,
    onCrop,
    onReplace,
    onRemove,
    showLayoutControls,
}) => {
    const editor = useSlateStatic();
    const isSelected = useSelected();
    const isVoid = Editor.isVoid(editor, element);
    const isSupportingCaptions = !isVoid;
    const isCaptionVisible =
        isSupportingCaptions && (isSelected || !EditorCommands.isNodeEmpty(editor, element));

    const handleResize = useCallback(
        function (width: Size.Size) {
            updateImage(editor, { width: Size.toString(width) });
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
    const handleUpdate = useCallback((patch) => updateImage(editor, patch), [editor]);

    const image = UploadcareImage.createFromPrezlyStoragePayload(element.file).preview(
        availableWidth * 2, // Using 2x for retina.
    );
    const layout = element.layout ?? ImageLayout.CONTAINED;
    const isResizable = layout === ImageLayout.CONTAINED;
    const width = useMemo(() => Size.fromString(element.width), [element.width]);
    const originalWidth = useMemo(
        () => Size.fromPixels(image.originalWidth),
        [image.originalWidth],
    );

    return (
        <ResizableEditorBlock
            {...attributes}
            element={element}
            layout={element.layout}
            onResize={handleResize}
            overlay="always"
            renderBlock={() => <Image className={styles.image} image={image} />}
            renderMenu={({ onClose }) => (
                <ImageMenu
                    element={element}
                    onClose={onClose}
                    onCrop={handleCrop}
                    onRemove={handleRemove}
                    onReplace={handleReplace}
                    onUpdate={handleUpdate}
                    showLayoutControls={showLayoutControls}
                />
            )}
            resizable={isResizable}
            void={isVoid}
            width={isResizable ? width : HUNDRED_PERCENT}
            minWidth={HUNDRED_PIXELS}
            maxWidth={originalWidth}
        >
            {isSupportingCaptions ? (
                <div
                    className={classNames(styles.caption, {
                        [styles.visible]: isCaptionVisible,
                    })}
                >
                    {children}
                </div>
            ) : (
                children
            )}
        </ResizableEditorBlock>
    );
};
