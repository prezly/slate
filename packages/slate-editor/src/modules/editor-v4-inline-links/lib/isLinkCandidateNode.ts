import { isElementNode } from '@prezly/slate-types';

import type { LinkCandidateNode } from '../types';
import { LINK_CANDIDATE_NODE_TYPE } from '../types';

export function isLinkCandidateNode(node: any): node is LinkCandidateNode {
    return isElementNode<LinkCandidateNode>(node, LINK_CANDIDATE_NODE_TYPE);
}
