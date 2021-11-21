import { isElementNode } from '@prezly/slate-types';

import { IMAGE_CANDIDATE_TYPE } from '../constants';
import type { ImageCandidateNode } from '../types';

const isImageCandidateElement = (node: unknown): node is ImageCandidateNode =>
    isElementNode<ImageCandidateNode>(node, IMAGE_CANDIDATE_TYPE);

export default isImageCandidateElement;
