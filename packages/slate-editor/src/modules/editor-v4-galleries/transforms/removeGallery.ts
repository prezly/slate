import { EditorCommands } from '@prezly/slate-commons';
import type { GalleryNode } from '@prezly/slate-types';
import { isGalleryNode } from '@prezly/slate-types';
import type { Editor } from 'slate';

export function removeGallery(editor: Editor): GalleryNode | null {
    return EditorCommands.removeNode<GalleryNode>(editor, {
        match: isGalleryNode,
    });
}
