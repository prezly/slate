import { EditorCommands } from '@prezly/slate-commons';
import { Editor } from 'slate';

import { CoverageElementType } from '../types';

import isCoverageElement from './isCoverageElement';

const getCurrentCoverageElement = (editor: Editor): CoverageElementType | null => {
    const [currentNode] = EditorCommands.getCurrentNodeEntry(editor) || [];

    if (currentNode && isCoverageElement(currentNode)) {
        return currentNode;
    }

    return null;
};

export default getCurrentCoverageElement;
