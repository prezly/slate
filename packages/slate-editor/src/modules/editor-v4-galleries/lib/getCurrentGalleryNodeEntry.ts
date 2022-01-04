import { EditorCommands } from '@prezly/slate-commons';
import type { GalleryNode } from '@prezly/slate-types';
import { isGalleryNode } from '@prezly/slate-types';
import type { Editor, NodeEntry } from 'slate';

export function getCurrentGalleryNodeEntry(editor: Editor): NodeEntry<GalleryNode> | null {
    const currentNodeEntry = EditorCommands.getCurrentNodeEntry(editor);
    if (currentNodeEntry && isGalleryNode(currentNodeEntry[0])) {
        return currentNodeEntry as NodeEntry<GalleryNode>;
    }

    return null;
}
