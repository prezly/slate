import { ElementType, LinkCandidateNode } from '../types';
import { isElementNode } from '@prezly/slate-types';

const isLinkCandidateElement = (node: unknown): node is LinkCandidateNode =>
    isElementNode<LinkCandidateNode>(node, ElementType.LINK_CANDIDATE);

export default isLinkCandidateElement;
