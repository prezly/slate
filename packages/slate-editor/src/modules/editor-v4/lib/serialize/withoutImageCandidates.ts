import { Transforms } from 'slate';

import { isImageCandidateElement } from '../../../../modules/editor-v4-image';

import type { Transform } from './types';

const withoutImageCandidates: Transform = (editor): void => {
    Transforms.removeNodes(editor, {
        at: [],
        match: isImageCandidateElement,
    });
};

export default withoutImageCandidates;
