import { IMAGE_CANDIDATE_TYPE } from '../constants';
import { ImageCandidateNode } from '../types';

const createImageCandidate = (src: string, href = ''): ImageCandidateNode => ({
    children: [{ text: '' }],
    href,
    src,
    type: IMAGE_CANDIDATE_TYPE,
});

export default createImageCandidate;
