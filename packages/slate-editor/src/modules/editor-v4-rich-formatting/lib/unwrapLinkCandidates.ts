import { EditorCommands } from '@prezly/slate-commons';
import type { Editor } from 'slate';
import { Transforms } from 'slate';

import isLinkCandidateElement from './isLinkCandidateElement';

function unwrapLinkCandidates(editor: Editor): void {
    const at = EditorCommands.getEditorRange(editor);

    if (!at) {
        return;
    }

    Transforms.unwrapNodes(editor, {
        at,
        match: isLinkCandidateElement,
        split: true,
    });
}

export default unwrapLinkCandidates;
