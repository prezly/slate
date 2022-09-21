import React from 'react';
import type { RenderElementProps } from 'slate-react';

import { PlaceholderAttachment } from '#icons';

import { PlaceholderElement } from './PlaceholderElement';

export function AttachmentPlaceholderElement({
    attributes,
    children,
    element,
}: RenderElementProps) {
    return (
        <PlaceholderElement
            attributes={attributes}
            element={element}
            icon={PlaceholderAttachment}
            title="Drag or click to upload an attachment"
            description="Supported formats: pdf, .ppt, Keynote, .zip, .doc, etc. - Max. 25MB"
        >
            {children}
        </PlaceholderElement>
    );
}
