import { EditorCommands } from '@prezly/slate-commons';
import { isGalleryNode } from '@prezly/slate-types';
import type { SlateEditor } from '@udecode/plate-common';
import type { NodeEntry } from 'slate';

import { createGallery } from './createGallery';

const ALLOWED_ATTRIBUTES = Object.keys(createGallery({}));

export function normalizeRedundantGalleryAttributes(
    editor: SlateEditor,
    [node, path]: NodeEntry,
): boolean {
    if (!isGalleryNode(node)) {
        return false;
    }

    return EditorCommands.normalizeRedundantAttributes(editor, [node, path], ALLOWED_ATTRIBUTES);
}
