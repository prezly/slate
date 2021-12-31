import type { Editor } from 'slate';

import { unwrapLinkCandidates } from '#modules/editor-v4-rich-formatting';

function withoutLinkCandidates(editor: Editor): void {
    unwrapLinkCandidates(editor);
}

export default withoutLinkCandidates;
