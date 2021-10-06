import { NewsroomRef } from '@prezly/sdk';
import { RefObject } from 'react';
import { Editor } from 'slate';

export interface GalleriesExtensionParameters {
    mediaGalleryTab?: {
        newsroom: NewsroomRef;
    };
}

export interface GalleriesParameters {
    availableWidth: number;
    containerRef: RefObject<HTMLElement>;
    onEdit: (editor: Editor) => void;
}
