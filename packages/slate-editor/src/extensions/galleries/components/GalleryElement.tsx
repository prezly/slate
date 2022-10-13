import type { GalleryNode } from '@prezly/slate-types';
import { UploadcareImage } from '@prezly/uploadcare';
import React from 'react';
import type { Editor } from 'slate';
import type { RenderElementProps } from 'slate-react';

import { EditorBlock } from '#components';
import { useSize } from '#lib';

import { Gallery } from './Gallery';
import { GalleryMenu } from './GalleryMenu';

interface Props extends RenderElementProps {
    availableWidth: number;
    element: GalleryNode;
    onEdit: (editor: Editor) => void;
    withWidthOption: boolean;
}

export function GalleryElement({
    availableWidth,
    attributes,
    children,
    element,
    onEdit,
    withWidthOption,
}: Props) {
    const [sizer, size] = useSize(Sizer, { width: availableWidth });
    return (
        <EditorBlock
            {...attributes}
            element={element}
            layout={withWidthOption ? element.layout : undefined}
            // We have to render children or Slate will fail when trying to find the node.
            renderAboveFrame={children}
            renderReadOnlyFrame={() => (
                <>
                    {sizer}
                    <Gallery
                        images={element.images.map((image) =>
                            UploadcareImage.createFromPrezlyStoragePayload(image.file),
                        )}
                        padding={element.padding}
                        size={element.thumbnail_size}
                        width={size.width}
                    />
                </>
            )}
            renderMenu={({ onClose }) => (
                <GalleryMenu
                    element={element}
                    onEdit={onEdit}
                    onClose={onClose}
                    withWidthOption={withWidthOption}
                />
            )}
            void
        />
    );
}

function Sizer() {
    return <div />;
}
