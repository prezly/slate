import { EditorCommands } from '@prezly/slate-commons';
import { Editor, NodeEntry } from 'slate';

import createGallery from './createGallery';
import isGalleryElement from './isGalleryElement';

const ALLOWED_ATTRIBUTES = Object.keys(createGallery([]));

const normalizeRedundantGalleryAttributes = (editor: Editor, [node, path]: NodeEntry): boolean => {
    if (!isGalleryElement(node)) {
        return false;
    }

    return EditorCommands.normalizeRedundantAttributes(editor, [node, path], ALLOWED_ATTRIBUTES);
};

export default normalizeRedundantGalleryAttributes;
