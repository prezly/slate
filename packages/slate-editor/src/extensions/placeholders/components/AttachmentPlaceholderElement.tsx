import React from 'react';

import { PlaceholderAttachment } from '#icons';

import { type Props as BaseProps, PlaceholderElement } from './PlaceholderElement';

type Props = Omit<BaseProps, 'icon' | 'title' | 'description' | 'dropZone'>;

export function AttachmentPlaceholderElement({ children, ...props }: Props) {
    return (
        <PlaceholderElement
            {...props}
            // Core
            icon={PlaceholderAttachment}
            title={Title}
            description="Supported formats: pdf, .ppt, Keynote, .zip, .doc, etc. - Max. 25MB"
            dropZone
        >
            {children}
        </PlaceholderElement>
    );
}

function Title(props: { isDragOver: boolean }) {
    if (props.isDragOver) {
        return 'Drop a file here';
    }
    return 'Drag or click to upload an attachment';
}
