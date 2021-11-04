import { ElementType, LinkCandidateElementType } from '../types';
import { isElementNode } from '@prezly/slate-types';

const isLinkCandidateElement = (node: unknown): node is LinkCandidateElementType =>
    isElementNode<LinkCandidateElementType>(node, ElementType.LINK_CANDIDATE);

export default isLinkCandidateElement;
