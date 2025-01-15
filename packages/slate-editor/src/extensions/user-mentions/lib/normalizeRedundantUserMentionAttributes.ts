import { EditorCommands } from '@prezly/slate-commons';
import { isMentionNode } from '@prezly/slate-types';
import type { NodeEntry, SlateEditor } from '@udecode/plate';

import { createUserMention } from './createUserMention';

const ALLOWED_ATTRIBUTES = Object.keys(
    createUserMention({
        avatar_url: '',
        id: 0,
        name: '',
    }),
);

export function normalizeRedundantUserMentionAttributes(
    editor: SlateEditor,
    [node, path]: NodeEntry,
): boolean {
    if (!isMentionNode(node)) {
        return false;
    }

    return EditorCommands.normalizeRedundantAttributes(editor, [node, path], ALLOWED_ATTRIBUTES);
}
