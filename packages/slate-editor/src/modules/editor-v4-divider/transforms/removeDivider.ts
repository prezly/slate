import { EditorCommands } from '@prezly/slate-commons';
import { isDividerNode } from '@prezly/slate-types';
import type { Editor } from 'slate';

export function removeDivider(editor: Editor): void {
    EditorCommands.removeNode(editor, {
        match: isDividerNode,
    });
}
