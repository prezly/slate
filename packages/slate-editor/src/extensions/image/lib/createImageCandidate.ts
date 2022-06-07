import { IMAGE_CANDIDATE_NODE_TYPE } from '../constants';
import type { ImageCandidateNode } from '../types';

export function createImageCandidate(src: string, href = ''): ImageCandidateNode {
    return {
        children: [{ text: '' }],
        href,
        src,
        type: IMAGE_CANDIDATE_NODE_TYPE,
    };
}
