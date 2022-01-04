import type { LinkCandidateNode } from '../types';
import { ElementType } from '../types';

export function createLinkCandidate(id: string): LinkCandidateNode {
    return {
        children: [],
        id,
        type: ElementType.LINK_CANDIDATE,
    };
}
