import { EditorCommands } from '@prezly/slate-commons';
import { isHtmlNode } from '@prezly/slate-types';
import type { Editor } from 'slate';

export function removeHtmlBlock(editor: Editor): void {
    EditorCommands.removeNode(editor, {
        match: isHtmlNode,
    });
}
