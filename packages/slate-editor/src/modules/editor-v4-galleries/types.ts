import { NewsroomRef } from '@prezly/sdk';
import { RefObject } from 'react';
import { Editor } from 'slate';

export enum GalleryLayout {
    CONTAINED = 'contained',
    EXPANDED = 'expanded',
    FULL_WIDTH = 'full-width',
}

export enum GalleryImageSize {
    L = 'L',
    M = 'M',
    S = 'S',
    XL = 'XL',
    XS = 'XS',
}

export enum GalleryPadding {
    L = 'L',
    M = 'M',
    S = 'S',
}

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
