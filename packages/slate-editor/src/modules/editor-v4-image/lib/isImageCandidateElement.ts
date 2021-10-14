import { isElementNode } from '@prezly/slate-types';
import { Node } from 'slate';

import { IMAGE_CANDIDATE_TYPE } from '../constants';
import { ImageCandidateElementType } from '../types';

const isImageCandidateElement = (node: Node): node is ImageCandidateElementType =>
    isElementNode(node) && node.type === IMAGE_CANDIDATE_TYPE;

export default isImageCandidateElement;
