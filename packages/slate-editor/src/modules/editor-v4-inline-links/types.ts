import type { ElementNode } from '@prezly/slate-types';

export const LINK_CANDIDATE_NODE_TYPE = 'link-candidate';

export interface LinkCandidateNode extends ElementNode {
    type: typeof LINK_CANDIDATE_NODE_TYPE;
    id: string;
}
