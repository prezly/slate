import type { GalleryNode } from '@prezly/slate-types';
import { UploadcareImage } from '@prezly/uploadcare';
import React from 'react';
import type { Editor } from 'slate';
import type { RenderElementProps } from 'slate-react';

import { EditorBlock } from '#components';

import { Gallery } from './Gallery';
import { GalleryMenu } from './GalleryMenu';

interface Props extends RenderElementProps {
    availableWidth: number;
    element: GalleryNode;
    onEdit: (editor: Editor) => void;
}

export function GalleryElement({ attributes, availableWidth, children, element, onEdit }: Props) {
    return (
        <EditorBlock
            {...attributes}
            element={element}
            layout={element.layout}
            renderBlock={() => (
                <Gallery
                    images={element.images.map((image) =>
                        UploadcareImage.createFromPrezlyStoragePayload(image.file),
                    )}
                    padding={element.padding}
                    size={element.thumbnail_size}
                    width={availableWidth}
                />
            )}
            renderMenu={({ onClose }) => (
                <GalleryMenu element={element} onEdit={onEdit} onClose={onClose} />
            )}
            void
        >
            {children}
        </EditorBlock>
    );
}
