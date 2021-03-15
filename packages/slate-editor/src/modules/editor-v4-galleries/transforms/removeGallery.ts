import { EditorCommands } from '@prezly/slate-commons';
import { Editor } from 'slate';

import { isGalleryElement } from '../lib';
import { GalleryElementType } from '../types';

const removeGallery = (editor: Editor): GalleryElementType | null =>
    EditorCommands.removeNode<GalleryElementType>(editor, {
        match: isGalleryElement,
    });

export default removeGallery;
