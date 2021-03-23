import { unwrapLinkCandidates } from '../../../../modules/editor-v4-rich-formatting';

import { Transform } from './types';

const withoutLinkCandidates: Transform = (editor): void => {
    unwrapLinkCandidates(editor);
};

export default withoutLinkCandidates;
