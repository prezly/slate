import type { GalleryNode } from '@prezly/slate-types';
import { UploadcareImage } from '@prezly/uploadcare';
import type { RefObject } from 'react';
import React from 'react';
import type { Editor } from 'slate';
import type { RenderElementProps } from 'slate-react';

import { EditorBlock } from '#components';

import { Gallery } from './Gallery';

interface Props extends RenderElementProps {
    availableWidth: number;
    containerRef: RefObject<HTMLElement>;
    element: GalleryNode;
    onEdit: (editor: Editor) => void;
}

export function GalleryElement({ attributes, availableWidth, children, element }: Props) {
    return (
        <EditorBlock
            {...attributes}
            element={element}
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
            void
        >
            {children}
        </EditorBlock>
    );
}
