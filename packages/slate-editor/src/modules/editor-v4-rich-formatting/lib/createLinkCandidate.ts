import { ElementType, LinkCandidateElementType } from '../types';

const createLinkCandidate = (id: string): LinkCandidateElementType => ({
    children: [],
    id,
    type: ElementType.LINK_CANDIDATE,
});

export default createLinkCandidate;
