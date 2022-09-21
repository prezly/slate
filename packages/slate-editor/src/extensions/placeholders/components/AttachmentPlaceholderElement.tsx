import React from 'react';

import { PlaceholderAttachment } from '#icons';

import { type Props as BaseProps, PlaceholderElement } from './PlaceholderElement';

type Props = Omit<BaseProps, 'icon' | 'title' | 'description'>;

export function AttachmentPlaceholderElement({ children, dropzone, ...props }: Props) {
    return (
        <PlaceholderElement
            {...props}
            // Core
            icon={PlaceholderAttachment}
            title={dropzone ? 'Drop a file here' : 'Drag or click to upload an attachment'}
            description="Supported formats: pdf, .ppt, Keynote, .zip, .doc, etc. - Max. 25MB"
            // Variations
            dropzone={dropzone}
        >
            {children}
        </PlaceholderElement>
    );
}
