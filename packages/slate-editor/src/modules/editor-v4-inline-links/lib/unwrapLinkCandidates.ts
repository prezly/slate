import { EditorCommands } from '@prezly/slate-commons';
import type { Editor } from 'slate';
import { Transforms } from 'slate';

import { isLinkCandidateNode } from './isLinkCandidateNode';

export function unwrapLinkCandidates(editor: Editor): void {
    const at = EditorCommands.getEditorRange(editor);

    if (!at) {
        return;
    }

    Transforms.unwrapNodes(editor, {
        at,
        match: isLinkCandidateNode,
        split: true,
    });
}
