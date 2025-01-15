import { EditorCommands } from '@prezly/slate-commons';
import type { GalleryNode } from '@prezly/slate-types';
import { isGalleryNode } from '@prezly/slate-types';
import type { SlateEditor } from '@udecode/plate';

export function removeGallery(editor: SlateEditor): GalleryNode | null {
    return EditorCommands.removeNode<GalleryNode>(editor, {
        match: isGalleryNode,
    });
}
