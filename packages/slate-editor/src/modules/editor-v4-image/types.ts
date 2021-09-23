import { NewsroomRef } from '@prezly/sdk';
import { ImageNode } from '@prezly/slate-types';
import { RefObject } from 'react';
import { Editor } from 'slate';

export enum ImageLayout {
    CONTAINED = 'contained',
    EXPANDED = 'expanded',
    FULL_WIDTH = 'full-width',
}

export interface ImageExtensionParameters {
    captions?: boolean;
    mediaGalleryTab?: {
        newsroom: NewsroomRef;
    };
    showLayoutControls?: boolean;
}

export interface ImageParameters extends ImageExtensionParameters {
    availableWidth: number;
    containerRef: RefObject<HTMLElement>;
    onEdit?: (editor: Editor) => void;
    onRemove?: (editor: Editor, element: ImageNode) => void;
}
