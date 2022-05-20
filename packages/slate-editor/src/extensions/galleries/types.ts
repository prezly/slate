import type { NewsroomRef } from '@prezly/sdk';
import type { RefObject } from 'react';
import type { Editor } from 'slate';

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
