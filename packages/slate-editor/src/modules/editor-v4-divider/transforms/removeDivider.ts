import { EditorCommands } from '@prezly/slate-commons';
import { isDividerNode } from '@prezly/slate-types';
import { Editor } from 'slate';

export default function removeDivider(editor: Editor): void {
    EditorCommands.removeNode(editor, {
        match: isDividerNode,
    });
}
