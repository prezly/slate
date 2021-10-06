import { EditorCommands } from '@prezly/slate-commons';
import { ImageNode, isImageNode } from '@prezly/slate-types';
import { Editor, NodeEntry } from 'slate';

const getCurrentImageNodeEntry = (editor: Editor): NodeEntry<ImageNode> | null => {
    const currentNodeEntry = EditorCommands.getCurrentNodeEntry(editor);
    if (currentNodeEntry && isImageNode(currentNodeEntry[0])) {
        return currentNodeEntry as NodeEntry<ImageNode>;
    }

    return null;
};

export default getCurrentImageNodeEntry;
