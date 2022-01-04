import { EditorCommands } from '@prezly/slate-commons';
import type { PlaceholderKey } from '@prezly/slate-types';
import { isPlaceholderNode } from '@prezly/slate-types';
import type { Editor, NodeEntry } from 'slate';

import { createPlaceholderMention } from './createPlaceholderMention';

const ALLOWED_ATTRIBUTES = Object.keys(createPlaceholderMention('' as PlaceholderKey));

export function normalizeRedundantPlaceholderMentionAttributes(
    editor: Editor,
    [node, path]: NodeEntry,
): boolean {
    if (!isPlaceholderNode(node)) {
        return false;
    }

    return EditorCommands.normalizeRedundantAttributes(editor, [node, path], ALLOWED_ATTRIBUTES);
}
