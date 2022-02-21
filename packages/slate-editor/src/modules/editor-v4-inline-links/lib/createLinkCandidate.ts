import type { LinkCandidateNode } from '#modules/editor-v4-inline-links';

import { LINK_CANDIDATE_NODE_TYPE } from '../types';

export function createLinkCandidate(props: {
    id: LinkCandidateNode['id'];
    children?: LinkCandidateNode['children'];
}): LinkCandidateNode {
    const { id, children } = props;
    return {
        type: LINK_CANDIDATE_NODE_TYPE,
        id,
        children: children || [{ text: '' }],
    };
}
