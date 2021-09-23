import { EditorCommands } from '@prezly/slate-commons';
import { GalleryNode, isGalleryNode } from '@prezly/slate-types';
import { Editor, NodeEntry } from 'slate';

const getCurrentGalleryNodeEntry = (editor: Editor): NodeEntry<GalleryNode> | null => {
    const currentNodeEntry = EditorCommands.getCurrentNodeEntry(editor);
    if (currentNodeEntry && isGalleryNode(currentNodeEntry[0])) {
        return currentNodeEntry as NodeEntry<GalleryNode>;
    }

    return null;
};

export default getCurrentGalleryNodeEntry;
