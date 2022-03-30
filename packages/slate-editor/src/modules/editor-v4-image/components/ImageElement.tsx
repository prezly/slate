import { EditorCommands } from '@prezly/slate-commons';
import type { ImageNode } from '@prezly/slate-types';
import { ImageLayout } from '@prezly/slate-types';
import { UploadcareImage } from '@prezly/uploadcare';
import classNames from 'classnames';
import type { FunctionComponent } from 'react';
import React, { useCallback } from 'react';
import { Editor } from 'slate';
import type { RenderElementProps } from 'slate-react';
import { useSelected, useSlateStatic } from 'slate-react';

import { ResizableEditorBlock } from '#components';

import { removeImage, updateImage } from '../transforms';

import { Image } from './Image';
import styles from './ImageElement.module.scss';
import { ImageMenu } from './ImageMenu';

interface Props extends RenderElementProps {
    element: ImageNode;
    onCrop: (editor: Editor, element: ImageNode) => void;
    onRemove: (editor: Editor, element: ImageNode) => void;
    showLayoutControls: boolean;
}

export const ImageElement: FunctionComponent<Props> = ({
    attributes,
    children,
    element,
    onCrop,
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
        function (width: string) {
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
    const handleUpdate = useCallback((patch) => updateImage(editor, patch), [editor]);

    const image = UploadcareImage.createFromPrezlyStoragePayload(element.file).preview();
    const layout = element.layout ?? ImageLayout.CONTAINED;
    const isResizable = layout === ImageLayout.CONTAINED;

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
                    onUpdate={handleUpdate}
                    showLayoutControls={showLayoutControls}
                />
            )}
            resizable={isResizable}
            void={isVoid}
            width={isResizable ? element.width : '100%'}
            minWidth="100px"
            maxWidth={`${image.originalWidth}px`}
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
