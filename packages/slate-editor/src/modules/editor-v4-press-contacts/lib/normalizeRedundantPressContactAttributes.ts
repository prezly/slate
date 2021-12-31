import { EditorCommands } from '@prezly/slate-commons';
import { isContactNode } from '@prezly/slate-types';
import type { Editor, NodeEntry } from 'slate';

import createPressContact from './createPressContact';

const ALLOWED_ATTRIBUTES = Object.keys(
    createPressContact({
        avatar_url: null,
        company: null,
        description: null,
        email: null,
        facebook: null,
        id: 0,
        mobile: null,
        name: '',
        phone: null,
        twitter: null,
        uuid: '00000000-0000-0000-0000-000000000000',
        website: null,
    }),
);

function normalizeRedundantPressContactAttributes(
    editor: Editor,
    [node, path]: NodeEntry,
): boolean {
    if (!isContactNode(node)) {
        return false;
    }

    return EditorCommands.normalizeRedundantAttributes(editor, [node, path], ALLOWED_ATTRIBUTES);
}

export default normalizeRedundantPressContactAttributes;
