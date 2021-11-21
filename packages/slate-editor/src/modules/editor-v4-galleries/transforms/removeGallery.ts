import { EditorCommands } from '@prezly/slate-commons';
import type { GalleryNode } from '@prezly/slate-types';
import { isGalleryNode } from '@prezly/slate-types';
import type { Editor } from 'slate';

const removeGallery = (editor: Editor): GalleryNode | null =>
    EditorCommands.removeNode<GalleryNode>(editor, {
        match: isGalleryNode,
    });

export default removeGallery;
