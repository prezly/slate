import { isElementNode } from '@prezly/slate-types';

import type { LinkCandidateNode } from '../types';
import { ElementType } from '../types';

function isLinkCandidateElement(node: unknown): node is LinkCandidateNode {
    return isElementNode<LinkCandidateNode>(node, ElementType.LINK_CANDIDATE);
}

export default isLinkCandidateElement;
