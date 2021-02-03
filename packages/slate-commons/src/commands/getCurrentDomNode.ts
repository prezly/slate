import { ReactEditor } from 'slate-react';

import getCurrentNodeEntry from './getCurrentNodeEntry';
import toDomNode from './toDomNode';

const getCurrentDomNode = (editor: ReactEditor): HTMLElement | null => {
    const [currentNode] = getCurrentNodeEntry(editor) || [];
    if (!currentNode) {
        return null;
    }

    return toDomNode(editor, currentNode);
};

export default getCurrentDomNode;
