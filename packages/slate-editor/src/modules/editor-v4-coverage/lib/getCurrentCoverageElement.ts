import { EditorCommands } from '@prezly/slate-commons';
import { CoverageNode } from '@prezly/slate-types';
import { Editor } from 'slate';

import isCoverageElement from './isCoverageElement';

const getCurrentCoverageElement = (editor: Editor): CoverageNode | null => {
    const [currentNode] = EditorCommands.getCurrentNodeEntry(editor) || [];

    if (currentNode && isCoverageElement(currentNode)) {
        return currentNode;
    }

    return null;
};

export default getCurrentCoverageElement;
