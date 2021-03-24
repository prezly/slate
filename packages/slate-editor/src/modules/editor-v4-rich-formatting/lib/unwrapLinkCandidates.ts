import { EditorCommands } from '@prezly/slate-commons';
import { Editor, Transforms } from 'slate';

import isLinkCandidateElement from './isLinkCandidateElement';

const unwrapLinkCandidates = (editor: Editor): void => {
    const at = EditorCommands.getEditorRange(editor);

    if (!at) {
        return;
    }

    Transforms.unwrapNodes(editor, {
        at,
        match: isLinkCandidateElement,
        split: true,
    });
};

export default unwrapLinkCandidates;
