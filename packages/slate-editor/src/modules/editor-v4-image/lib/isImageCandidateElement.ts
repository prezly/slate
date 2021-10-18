import { EditorCommands } from '@prezly/slate-commons';

import { IMAGE_CANDIDATE_TYPE } from '../constants';
import { ImageCandidateElementType } from '../types';

const isImageCandidateElement = (node: unknown): node is ImageCandidateElementType =>
    EditorCommands.isElementWithType(node) && node.type === IMAGE_CANDIDATE_TYPE;

export default isImageCandidateElement;
