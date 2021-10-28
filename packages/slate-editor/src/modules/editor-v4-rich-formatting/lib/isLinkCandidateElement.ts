import { Element } from 'slate';

import { ElementType, LinkCandidateElementType } from '../types';

const isLinkCandidateElement = (node: unknown): node is LinkCandidateElementType =>
    Element.isElementType(node, ElementType.LINK_CANDIDATE);

export default isLinkCandidateElement;
