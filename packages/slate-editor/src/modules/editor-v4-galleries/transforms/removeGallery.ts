import { EditorCommands } from '@prezly/slate-commons';
import { GalleryNode, isGalleryNode } from '@prezly/slate-types';
import { Editor } from 'slate';

const removeGallery = (editor: Editor): GalleryNode | null =>
    EditorCommands.removeNode<GalleryNode>(editor, {
        match: isGalleryNode,
    });

export default removeGallery;
