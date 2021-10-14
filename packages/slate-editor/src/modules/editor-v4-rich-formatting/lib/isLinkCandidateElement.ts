import { isElementNode } from '@prezly/slate-types';
import { Node } from 'slate';

import { ElementType, LinkCandidateElementType } from '../types';

const isLinkCandidateElement = (node: Node): node is LinkCandidateElementType =>
    isElementNode(node) && node.type === ElementType.LINK_CANDIDATE;

export default isLinkCandidateElement;
