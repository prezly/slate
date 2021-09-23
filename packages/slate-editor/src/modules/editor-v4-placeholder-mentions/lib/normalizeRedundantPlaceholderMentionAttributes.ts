import { EditorCommands } from '@prezly/slate-commons';
import { isPlaceholderNode } from '@prezly/slate-types';
import { Editor, NodeEntry } from 'slate';

import createPlaceholderMention from './createPlaceholderMention';

const ALLOWED_ATTRIBUTES = Object.keys(createPlaceholderMention(''));

const normalizeRedundantPlaceholderMentionAttributes = (
    editor: Editor,
    [node, path]: NodeEntry,
): boolean => {
    if (!isPlaceholderNode(node)) {
        return false;
    }

    return EditorCommands.normalizeRedundantAttributes(editor, [node, path], ALLOWED_ATTRIBUTES);
};

export default normalizeRedundantPlaceholderMentionAttributes;
