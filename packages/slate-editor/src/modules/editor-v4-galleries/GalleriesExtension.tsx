import type { Extension } from '@prezly/slate-commons';
import { createDeserializeElement } from '@prezly/slate-commons';
import { GALLERY_NODE_TYPE, isGalleryNode } from '@prezly/slate-types';
import React from 'react';
import type { RenderElementProps } from 'slate-react';

import { GalleryElement, GalleryMenu } from './components';
import { GALLERIES_EXTENSION_ID } from './constants';
import {
    normalizeInvalidGallery,
    normalizeRedundantGalleryAttributes,
    parseSerializedElement,
} from './lib';
import type { GalleriesParameters } from './types';

export const GalleriesExtension = ({
    availableWidth,
    containerRef,
    onEdit,
}: GalleriesParameters): Extension => ({
    deserialize: {
        element: {
            [GALLERY_NODE_TYPE]: createDeserializeElement(parseSerializedElement),
        },
    },
    id: GALLERIES_EXTENSION_ID,
    normalizers: [normalizeInvalidGallery, normalizeRedundantGalleryAttributes],
    renderElement: ({ attributes, children, element }: RenderElementProps) => {
        if (isGalleryNode(element)) {
            return (
                <>
                    <GalleryElement
                        attributes={attributes}
                        availableWidth={availableWidth}
                        containerRef={containerRef}
                        element={element}
                        onEdit={onEdit}
                    >
                        {children}
                    </GalleryElement>

                    {attributes.ref.current && (
                        <GalleryMenu
                            containerRef={containerRef}
                            element={attributes.ref.current}
                            gallery={element}
                            onEdit={onEdit}
                        />
                    )}
                </>
            );
        }

        return undefined;
    },
    rootTypes: [GALLERY_NODE_TYPE],
    voidTypes: [GALLERY_NODE_TYPE],
});
