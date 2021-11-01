import { EditorCommands } from '@prezly/slate-commons';
import { CoverageNode, isCoverageNode } from '@prezly/slate-types';
import { Editor } from 'slate';

const getCurrentCoverageNode = (editor: Editor): CoverageNode | null => {
    const [currentNode] = EditorCommands.getCurrentNodeEntry(editor) || [];

    if (isCoverageNode(currentNode)) {
        return currentNode;
    }

    return null;
};

export default getCurrentCoverageNode;
