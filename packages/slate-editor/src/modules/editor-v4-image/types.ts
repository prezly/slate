import type { NewsroomRef } from '@prezly/sdk';
import type { ElementNode, ImageNode } from '@prezly/slate-types';
import type { RefObject } from 'react';
import type { Editor, Text } from 'slate';

import type { IMAGE_CANDIDATE_TYPE } from './constants';

/**
 * Image Candidate Element is just an ephemeral node which exists inbetween deserialization
 * and updating editor value. It's sole purpose is to glue deserialization
 * (where we have access to <img> elements but we don't have access to editor instance)
 * and normalization (which is responsible for converting these nodes into actual images).
 */
export interface ImageCandidateNode extends ElementNode {
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
    onCrop?: (editor: Editor, element: ImageNode) => void;
    onRemove?: (editor: Editor, element: ImageNode) => void;
    onReplace?: (editor: Editor, element: ImageNode) => void;
}
