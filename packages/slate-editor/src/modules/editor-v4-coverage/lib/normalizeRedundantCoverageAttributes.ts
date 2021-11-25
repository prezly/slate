import { EditorCommands } from '@prezly/slate-commons';
import { isCoverageNode } from '@prezly/slate-types';
import type { Editor, NodeEntry } from 'slate';

import createCoverage from './createCoverage';

const ALLOWED_ATTRIBUTES = Object.keys(createCoverage(0));

const normalizeRedundantCoverageAttributes = (editor: Editor, [node, path]: NodeEntry): boolean => {
    if (!isCoverageNode(node)) {
        return false;
    }

    return EditorCommands.normalizeRedundantAttributes(editor, [node, path], ALLOWED_ATTRIBUTES);
};

export default normalizeRedundantCoverageAttributes;
