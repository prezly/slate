import type { NewsroomRef } from '@prezly/sdk';
import type { ElementNode } from '@prezly/slate-types';
import type { Text } from 'slate';

import type { IMAGE_CANDIDATE_NODE_TYPE } from './constants';

/**
 * Image Candidate Element is just an ephemeral node which exists inbetween deserialization
 * and updating editor value. It's sole purpose is to glue deserialization
 * (where we have access to <img> elements but we don't have access to editor instance)
 * and normalization (which is responsible for converting these nodes into actual images).
 */
export interface ImageCandidateNode extends ElementNode {
    type: typeof IMAGE_CANDIDATE_NODE_TYPE;
    children: Text[];
    /** empty string if no URL */
    href: string;
    src: string;
}

export interface ImageExtensionConfiguration {
    captions?: boolean;
    mediaGalleryTab?: {
        newsroom: NewsroomRef;
    };
    withAlignmentOptions?: boolean;
    withSizeOptions?: boolean;
    withLayoutOptions?: boolean;
    withNewTabOption?: boolean;
}
