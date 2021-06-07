import { NewsroomRef } from '@prezly/sdk';
import { UploadcareImageStoragePayload } from '@prezly/uploadcare';
import { RefObject } from 'react';
import { Editor, Element, Text } from 'slate';

import { IMAGE_CANDIDATE_TYPE, IMAGE_TYPE } from './constants';

export type ImageType = typeof IMAGE_TYPE;

export type ImageCandidateType = typeof IMAGE_CANDIDATE_TYPE;

export enum ImageLayout {
    CONTAINED = 'contained',
    EXPANDED = 'expanded',
    FULL_WIDTH = 'full-width',
}

export interface ImageElementType extends Element {
    file: UploadcareImageStoragePayload;
    /** empty string if no URL */
    href: string;
    layout: ImageLayout;
    type: ImageType;
    /** matches this regexp: /^\d+(\.\d+)?%$/ */
    width: string;
    /** matches this regexp: /^\d+(\.\d+)?%$/ */
    width_factor: string;
}

/**
 * Image Candidate Element is just an ephemeral node which exists inbetween deserialization
 * and updating editor value. It's sole purpose is to glue deserialization
 * (where we have access to <img> elements but we don't have access to editor instance)
 * and normalization (which is responsible for converting these nodes into actual images).
 */
export interface ImageCandidateElementType extends Element {
    children: Text[];
    /** empty string if no URL */
    href: string;
    src: string;
    type: ImageCandidateType;
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
    onRemove?: (editor: Editor, element: ImageElementType) => void;
}
