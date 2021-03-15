import { Element, Node } from 'slate';

import { IMAGE_CANDIDATE_TYPE } from '../constants';
import { ImageCandidateElementType } from '../types';

const isImageCandidateElement = (node: Node): node is ImageCandidateElementType =>
    Element.isElement(node) && node.type === IMAGE_CANDIDATE_TYPE;

export default isImageCandidateElement;
