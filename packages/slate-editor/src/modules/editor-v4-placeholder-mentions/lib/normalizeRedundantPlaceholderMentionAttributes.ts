import { EditorCommands } from '@prezly/slate-commons';
import { Editor, NodeEntry } from 'slate';

import createPlaceholderMention from './createPlaceholderMention';
import isPlaceholderMentionElement from './isPlaceholderMentionElement';

const ALLOWED_ATTRIBUTES = Object.keys(createPlaceholderMention(''));

const normalizeRedundantPlaceholderMentionAttributes = (
    editor: Editor,
    [node, path]: NodeEntry,
): boolean => {
    if (!isPlaceholderMentionElement(node)) {
        return false;
    }

    return EditorCommands.normalizeRedundantAttributes(editor, [node, path], ALLOWED_ATTRIBUTES);
};

export default normalizeRedundantPlaceholderMentionAttributes;
