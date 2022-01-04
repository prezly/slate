import { EditorCommands } from '@prezly/slate-commons';
import type { ImageNode } from '@prezly/slate-types';
import { ImageLayout, isImageNode } from '@prezly/slate-types';
import { UploadcareImage } from '@prezly/uploadcare';
import classNames from 'classnames';
import type { FunctionComponent, RefObject } from 'react';
import React, { useState } from 'react';
import { Editor, Transforms } from 'slate';
import type { RenderElementProps } from 'slate-react';
import { ReactEditor, useSelected, useSlate } from 'slate-react';

import { useToolbarsTheme } from '#modules/themes';

import { ImageWithLoadingPlaceholderV2, LoadingPlaceholderV2 } from '../../../../components';
import { Image as ImageIcon } from '../../../../icons';
import { LinkWithTooltip } from '../../../../modules/editor-v4-components';
import { ImageMenu } from '../ImageMenu';
import { ResizableContainer } from '../ResizableContainer';

import './ImageElement.scss';

interface Props extends RenderElementProps {
    availableWidth: number;
    containerRef: RefObject<HTMLElement>;
    element: ImageNode;
    onEdit: (editor: Editor) => void;
    onRemove: (editor: Editor, element: ImageNode) => void;
    showLayoutControls?: boolean;
}

const getImageAvailableWidth = ({
    availableWidth,
    layout,
    widthPercent,
}: {
    availableWidth: number;
    layout: ImageLayout;
    widthPercent: number;
}): number => {
    if (layout === ImageLayout.CONTAINED) {
        return (availableWidth * widthPercent) / 100;
    }

    return availableWidth;
};

export const ImageElement: FunctionComponent<Props> = ({
    attributes,
    availableWidth,
    children,
    containerRef,
    element,
    onEdit,
    onRemove,
    showLayoutControls,
}) => {
    const theme = useToolbarsTheme();
    const image = UploadcareImage.createFromPrezlyStoragePayload(element.file).preview(
        availableWidth * 2, // Using 2x for retina.
    );
    const activeLayout = showLayoutControls
        ? element.layout || ImageLayout.CONTAINED
        : ImageLayout.CONTAINED;
    const imageWidth =
        typeof image.originalWidth !== 'undefined' ? image.originalWidth : availableWidth;
    const defaultWidthFactor = `${Math.round(100 * Math.min(1, imageWidth / availableWidth))}%`;
    const imageWidthFactor = element.width_factor || defaultWidthFactor;
    const imageWidthPercent = element.width || '100%';

    const editor = useSlate();
    const isSelected = useSelected();
    const isSupportingCaptions = !Editor.isVoid(editor, element);
    const [isLoading, setLoading] = useState<boolean>(false);
    const [isLinkMenuOpen, setLinkMenuOpen] = useState<boolean>(false);
    const [imageElement, setImageElement] = useState<HTMLElement | null>(null);
    const isCaptionVisible =
        isSupportingCaptions &&
        (isSelected || isLinkMenuOpen || !EditorCommands.isNodeEmpty(editor, element));
    const isContainedLayout = activeLayout === ImageLayout.CONTAINED;

    function focusCurrentElement() {
        const path = ReactEditor.findPath(editor, element);
        Transforms.select(editor, path);
    }

    function handleResize(widthPercent: string, widthFactor: string) {
        Transforms.setNodes(
            editor,
            {
                width: widthPercent,
                width_factor: widthFactor,
            },
            { match: isImageNode },
        );
    }

    function handleResizeStop() {
        // We have to use `setTimeout` because something happens right after the resize stop
        // which causes the current image element to lose focus.
        setTimeout(focusCurrentElement);
    }

    function handleEdit() {
        focusCurrentElement();
        onEdit(editor);
    }

    return (
        <>
            {imageElement && (
                <ImageMenu
                    containerRef={containerRef}
                    element={imageElement}
                    href={element.href}
                    isLinkMenuOpen={isLinkMenuOpen}
                    layout={element.layout}
                    onEdit={handleEdit}
                    onIsLinkMenuOpenChange={setLinkMenuOpen}
                    onRemove={onRemove}
                    showLayoutControls={showLayoutControls}
                />
            )}
            <div
                {...attributes}
                className={classNames('editor-v4-image-element', {
                    'editor-v4-image-element--active': isSelected || isLinkMenuOpen,
                    'editor-v4-image-element--contained': activeLayout === ImageLayout.CONTAINED,
                    'editor-v4-image-element--expanded': activeLayout === ImageLayout.EXPANDED,
                    'editor-v4-image-element--full-width': activeLayout === ImageLayout.FULL_WIDTH,
                })}
                data-slate-type={element.type}
                data-slate-value={JSON.stringify(element)}
            >
                <ResizableContainer
                    className="editor-v4-image-element__resizable-container"
                    enabled={(isSelected || isLinkMenuOpen) && isContainedLayout && !isLoading}
                    maxWidth={availableWidth}
                    onResize={handleResize}
                    onResizeStop={handleResizeStop}
                    resizingClassName="editor-v4-image-element__resizable-container--resizing"
                    style={isContainedLayout ? null : { width: '100%' }}
                    theme={theme}
                    width={imageWidth}
                    widthFactor={imageWidthFactor}
                    widthPercent={imageWidthPercent}
                >
                    <LinkWithTooltip enabled={element.href !== ''} href={element.href}>
                        {({ ariaAttributes, onHide, onShow, setReferenceElement }) => (
                            <div {...ariaAttributes} draggable ref={setReferenceElement}>
                                <ImageWithLoadingPlaceholderV2
                                    alt={image.filename}
                                    availableWidth={getImageAvailableWidth({
                                        availableWidth,
                                        layout: activeLayout,
                                        widthPercent: parseInt(imageWidthPercent, 10),
                                    })}
                                    className="editor-v4-image-element__image"
                                    draggable={false}
                                    height={image.originalHeight}
                                    onClick={focusCurrentElement}
                                    onIsLoadingChange={setLoading}
                                    onMouseEnter={onShow}
                                    onMouseLeave={onHide}
                                    ref={setImageElement}
                                    renderLoadingState={({ percent }) => (
                                        <>
                                            <LoadingPlaceholderV2.Icon icon={ImageIcon} />
                                            <LoadingPlaceholderV2.Description percent={percent}>
                                                Loading Image
                                            </LoadingPlaceholderV2.Description>
                                            <LoadingPlaceholderV2.ProgressBar percent={percent} />
                                        </>
                                    )}
                                    src={image.cdnUrl}
                                    width={image.originalWidth}
                                />
                            </div>
                        )}
                    </LinkWithTooltip>
                </ResizableContainer>

                {isSupportingCaptions ? (
                    <div
                        className={classNames('editor-v4-image-element__caption', {
                            'editor-v4-image-element__caption--visible': isCaptionVisible,
                        })}
                    >
                        {children}
                    </div>
                ) : (
                    children
                )}
            </div>
        </>
    );
};
