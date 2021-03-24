import { EditorCommands } from '@prezly/slate-commons';
import { Editor, NodeEntry } from 'slate';

import createCoverage from './createCoverage';
import isCoverageElement from './isCoverageElement';

const ALLOWED_ATTRIBUTES = Object.keys(createCoverage(0));

const normalizeRedundantCoverageAttributes = (editor: Editor, [node, path]: NodeEntry): boolean => {
    if (!isCoverageElement(node)) {
        return false;
    }

    return EditorCommands.normalizeRedundantAttributes(editor, [node, path], ALLOWED_ATTRIBUTES);
};

export default normalizeRedundantCoverageAttributes;
