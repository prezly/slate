import { EditorCommands } from '@prezly/slate-commons';
import { isGalleryNode } from '@prezly/slate-types';
import type { Editor, NodeEntry } from 'slate';

import createGallery from './createGallery';

const ALLOWED_ATTRIBUTES = Object.keys(createGallery([]));

const normalizeRedundantGalleryAttributes = (editor: Editor, [node, path]: NodeEntry): boolean => {
    if (!isGalleryNode(node)) {
        return false;
    }

    return EditorCommands.normalizeRedundantAttributes(editor, [node, path], ALLOWED_ATTRIBUTES);
};

export default normalizeRedundantGalleryAttributes;
