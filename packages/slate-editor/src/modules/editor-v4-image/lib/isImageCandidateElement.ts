import { isElementNode } from '@prezly/slate-types';

import { IMAGE_CANDIDATE_TYPE } from '../constants';
import type { ImageCandidateNode } from '../types';

export function isImageCandidateElement(node: unknown): node is ImageCandidateNode {
    return isElementNode<ImageCandidateNode>(node, IMAGE_CANDIDATE_TYPE);
}

