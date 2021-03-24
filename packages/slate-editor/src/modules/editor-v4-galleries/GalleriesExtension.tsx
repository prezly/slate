import { createDeserializeElement, Extension } from '@prezly/slate-commons';
import React from 'react';
import { RenderElementProps } from 'slate-react';

import { GalleryElement, GalleryMenu } from './components';
import { GALLERIES_EXTENSION_ID, GALLERY_TYPE } from './constants';
import {
    isGalleryElement,
    normalizeInvalidGallery,
    normalizeRedundantGalleryAttributes,
    parseSerializedElement,
} from './lib';
import { GalleriesParameters } from './types';

const GalleriesExtension = ({
    availableWidth,
    containerRef,
    onEdit,
}: GalleriesParameters): Extension => ({
    deserialize: {
        element: {
            [GALLERY_TYPE]: createDeserializeElement(parseSerializedElement),
        },
    },
    id: GALLERIES_EXTENSION_ID,
    normalizers: [normalizeInvalidGallery, normalizeRedundantGalleryAttributes],
    renderElement: ({ attributes, children, element }: RenderElementProps) => {
        if (isGalleryElement(element)) {
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
    rootTypes: [GALLERY_TYPE],
    voidTypes: [GALLERY_TYPE],
});

export default GalleriesExtension;
