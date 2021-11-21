import { IMAGE_CANDIDATE_TYPE } from '../constants';
import type { ImageCandidateNode } from '../types';

const createImageCandidate = (src: string, href = ''): ImageCandidateNode => ({
    children: [{ text: '' }],
    href,
    src,
    type: IMAGE_CANDIDATE_TYPE,
});

export default createImageCandidate;
