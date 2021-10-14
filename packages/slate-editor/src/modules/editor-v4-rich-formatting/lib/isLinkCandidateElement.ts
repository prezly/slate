import { isElementNode } from '@prezly/slate-types';

import { ElementType, LinkCandidateElementType } from '../types';

const isLinkCandidateElement = (node: unknown): node is LinkCandidateElementType =>
    isElementNode(node) && node.type === ElementType.LINK_CANDIDATE;

export default isLinkCandidateElement;
