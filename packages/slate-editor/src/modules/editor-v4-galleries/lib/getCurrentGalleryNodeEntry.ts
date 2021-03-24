import { EditorCommands } from '@prezly/slate-commons';
import { Editor, NodeEntry } from 'slate';

import { GalleryElementType } from '../types';

import isGalleryElement from './isGalleryElement';

const getCurrentGalleryNodeEntry = (editor: Editor): NodeEntry<GalleryElementType> | null => {
    const currentNodeEntry = EditorCommands.getCurrentNodeEntry(editor);
    if (currentNodeEntry && isGalleryElement(currentNodeEntry[0])) {
        return currentNodeEntry as NodeEntry<GalleryElementType>;
    }

    return null;
};

export default getCurrentGalleryNodeEntry;
