import { Element, Node } from 'slate';

import { ElementType, LinkCandidateElementType } from '../types';

const isLinkCandidateElement = (node: Node): node is LinkCandidateElementType =>
    Element.isElement(node) && node.type === ElementType.LINK_CANDIDATE;

export default isLinkCandidateElement;
