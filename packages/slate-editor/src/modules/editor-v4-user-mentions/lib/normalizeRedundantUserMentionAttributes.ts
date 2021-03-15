import { EditorCommands } from '@prezly/slate-commons';
import { Editor, NodeEntry } from 'slate';

import createUserMention from './createUserMention';
import isUserMentionElement from './isUserMentionElement';

const ALLOWED_ATTRIBUTES = Object.keys(
    createUserMention({
        avatar_url: '',
        id: 0,
        name: '',
    }),
);

const normalizeRedundantUserMentionAttributes = (
    editor: Editor,
    [node, path]: NodeEntry,
): boolean => {
    if (!isUserMentionElement(node)) {
        return false;
    }

    return EditorCommands.normalizeRedundantAttributes(editor, [node, path], ALLOWED_ATTRIBUTES);
};

export default normalizeRedundantUserMentionAttributes;
