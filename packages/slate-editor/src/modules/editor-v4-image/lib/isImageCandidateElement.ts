import { isElementNode } from '@prezly/slate-types';

import { IMAGE_CANDIDATE_TYPE } from '../constants';
import { ImageCandidateElementType } from '../types';

const isImageCandidateElement = (node: unknown): node is ImageCandidateElementType =>
    isElementNode<ImageCandidateElementType>(node, IMAGE_CANDIDATE_TYPE);

export default isImageCandidateElement;
