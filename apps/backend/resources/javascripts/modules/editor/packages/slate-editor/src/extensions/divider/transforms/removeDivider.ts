import { EditorCommands } from '@prezly/slate-commons';
import { isDividerNode } from '@prezly/slate-types';
import type { SlateEditor } from '@udecode/plate';

export function removeDivider(editor: SlateEditor): void {
    EditorCommands.removeNode(editor, {
        match: isDividerNode,
    });
}
