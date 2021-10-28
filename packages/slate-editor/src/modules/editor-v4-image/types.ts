import { NewsroomRef } from '@prezly/sdk';
import { ImageNode } from '@prezly/slate-types';
import { RefObject } from 'react';
import { Editor, Element, Text } from 'slate';

import { IMAGE_CANDIDATE_TYPE } from './constants';

/**
 * Image Candidate Element is just an ephemeral node which exists inbetween deserialization
 * and updating editor value. It's sole purpose is to glue deserialization
 * (where we have access to <img> elements but we don't have access to editor instance)
 * and normalization (which is responsible for converting these nodes into actual images).
 */
export interface ImageCandidateElementType extends Element {
    type: typeof IMAGE_CANDIDATE_TYPE;
    children: Text[];
    /** empty string if no URL */
    href: string;
    src: string;
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
