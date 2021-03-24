import { IMAGE_CANDIDATE_TYPE } from '../constants';
import { ImageCandidateElementType } from '../types';

const createImageCandidate = (src: string, href = ''): ImageCandidateElementType => ({
    children: [{ text: '' }],
    href,
    src,
    type: IMAGE_CANDIDATE_TYPE,
});

export default createImageCandidate;
