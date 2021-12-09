import type { GalleryNode } from '@prezly/slate-types';
import { GalleryLayout } from '@prezly/slate-types';
import { UploadcareImage } from '@prezly/uploadcare';
import classNames from 'classnames';
import type { FunctionComponent, RefObject } from 'react';
import React from 'react';
import { useSize } from 'react-use';
import type { Editor } from 'slate';
import type { RenderElementProps } from 'slate-react';
import { useSelected, useSlate } from 'slate-react';

import Gallery from './Gallery';
import './GalleryElement.scss';
import GalleryTooltip from './GalleryTooltip';

interface Props extends RenderElementProps {
    availableWidth: number;
    containerRef: RefObject<HTMLElement>;
    element: GalleryNode;
    onEdit: (editor: Editor) => void;
}

const GalleryElement: FunctionComponent<Props> = ({
    attributes,
    availableWidth,
    children,
    containerRef,
    element,
    onEdit,
}) => {
    const editor = useSlate();
    const isSelected = useSelected();
    const [sizer, { width }] = useSize(() => <div contentEditable={false} />, {
        width: availableWidth,
    });
    const { layout } = element;

    const handleEdit = () => onEdit(editor);

    return (
        <div
            {...attributes}
            className={classNames('editor-v4-gallery-element', {
                'editor-v4-gallery-element--active': isSelected,
                'editor-v4-gallery-element--contained': layout === GalleryLayout.CONTAINED,
                'editor-v4-gallery-element--expanded': layout === GalleryLayout.EXPANDED,
                'editor-v4-gallery-element--full-width': layout === GalleryLayout.FULL_WIDTH,
            })}
            data-slate-type={element.type}
            data-slate-value={JSON.stringify(element)}
        >
            {sizer}

            <Gallery
                contentEditable={false}
                images={element.images.map((image) =>
                    UploadcareImage.createFromPrezlyStoragePayload(image.file),
                )}
                padding={element.padding}
                size={element.thumbnail_size}
                width={width}
            />

            {isSelected && (
                <GalleryTooltip
                    containerRef={containerRef}
                    element={attributes.ref.current}
                    onClick={handleEdit}
                />
            )}

            {children}
        </div>
    );
};

export default GalleryElement;
