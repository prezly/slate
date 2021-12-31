import { IMAGE_CANDIDATE_TYPE } from '../constants';
import type { ImageCandidateNode } from '../types';

function createImageCandidate(src: string, href = ''): ImageCandidateNode {
    return {
        children: [{ text: '' }],
        href,
        src,
        type: IMAGE_CANDIDATE_TYPE,
    };
}

export default createImageCandidate;
