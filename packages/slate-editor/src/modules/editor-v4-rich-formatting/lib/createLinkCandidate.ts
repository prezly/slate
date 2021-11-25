import type { LinkCandidateNode } from '../types';
import { ElementType } from '../types';

const createLinkCandidate = (id: string): LinkCandidateNode => ({
    children: [],
    id,
    type: ElementType.LINK_CANDIDATE,
});

export default createLinkCandidate;
