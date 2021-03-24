import { EditorCommands } from '@prezly/slate-commons';
import { Editor, NodeEntry } from 'slate';

import createPressContact from './createPressContact';
import isPressContactElement from './isPressContactElement';

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

const normalizeRedundantPressContactAttributes = (
    editor: Editor,
    [node, path]: NodeEntry,
): boolean => {
    if (!isPressContactElement(node)) {
        return false;
    }

    return EditorCommands.normalizeRedundantAttributes(editor, [node, path], ALLOWED_ATTRIBUTES);
};

export default normalizeRedundantPressContactAttributes;
