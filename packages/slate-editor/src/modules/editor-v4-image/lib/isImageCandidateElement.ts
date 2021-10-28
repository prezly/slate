import { Element } from 'slate';

import { IMAGE_CANDIDATE_TYPE } from '../constants';
import { ImageCandidateElementType } from '../types';

const isImageCandidateElement = (node: unknown): node is ImageCandidateElementType =>
    Element.isElementType(node, IMAGE_CANDIDATE_TYPE);

export default isImageCandidateElement;
