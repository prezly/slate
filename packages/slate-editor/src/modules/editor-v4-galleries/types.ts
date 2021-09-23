import { GalleryImage } from '@prezly/slate-types';
import { NewsroomRef } from '@prezly/sdk';
import { RefObject } from 'react';
import { Editor, Element } from 'slate';

import { GALLERY_TYPE } from './constants';

export type GalleryType = typeof GALLERY_TYPE;

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

export interface GalleryElementType extends Element {
    images: GalleryImage[];
    layout: GalleryLayout;
    padding: GalleryPadding;
    thumbnail_size: GalleryImageSize;
    type: GalleryType;
    uuid: string;
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
